import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CountryData, Locality } from '@core/interfaces/locality.interface';
import { MatIconModule } from '@angular/material/icon';
import { ValidatorsCustom } from '@utils/validators/ValidaorsClass';
import { decrypt, encrypt } from '@utils/util-encrypt';
import { HttpErrorResponse } from '@angular/common/http';

import {
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';
import { SnackbarCustomComponent } from '@shared/components/snackbar-custom/snackbar-custom.component';
import { CONSTANTES } from '@utils/constantes';
import { environment } from '@environments/environments';
import { LocalStorageService } from '@storage/LocalStorage.service';



const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, MatButtonModule, MatSelectModule, MatIconModule]
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MATERIAL_MODULES, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styles: `
    button.mat-raised-button.no-drop {
      cursor: no-drop !important;
    }
  `
})
export default class LoginComponent implements OnInit {

  public contactForm!: FormGroup;
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private _snackBar = inject(MatSnackBar);
  private _localStorage = inject(LocalStorageService);
  // Signals
  public isLogin = signal<boolean>(false);
  public errorMessage!: string;
  public localities = signal<Locality[]>([]);
  public countries = signal<CountryData[]>([]);
  public hidePassword = signal<boolean>(true);
  public hidePasswordConfirm = signal<boolean>(true);
  public musEqual = signal<boolean>(true);
  public uniqueLocalities = signal<Map<string, number>>(new Map());

  // Configurations snack
  configMatSnack: MatSnackBarConfig = {
    politeness: 'polite',
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
  }


  constructor(){
    this.isLogin.set( this.router.url.includes('login') );
    if (this.isLogin()) {
      this.contactForm = new FormGroup({
        email: new FormControl('', [Validators.required, ValidatorsCustom.emailAddress()]),
        password: new FormControl('', [Validators.required, ValidatorsCustom.passwordLength()]),
      })
    } else {
      this.contactForm = new FormGroup({
        email: new FormControl('', [Validators.required, ValidatorsCustom.emailAddress()]),
        password: new FormControl('', [Validators.required, ValidatorsCustom.passwordLength()]),
        confirmPassword: new FormControl('', [Validators.required]),
        country: new FormControl('', []),
        locality: new FormControl('', [Validators.required, ValidatorsCustom.dependentField('country')])
      },
      {
        validators: ValidatorsCustom.mustBeEquals('password', 'confirmPassword')
      }
    )
      this.authService.getCountry()
        .subscribe({
          next: (countries) => this.countries.set( countries ),
        });
    }
  }

  ngOnInit(): void {
  }

  onCountryChanged():void{
    this.uniqueLocalities().clear();
    // We search for the name by the id
    const country = this.countries().find((country) => country.id_country === this.contactForm.get('country')!.value );
    if( country ){
      this.authService.getLocality(country.countryName)
        .subscribe({
          next: (localites:Locality[]) => {
            this.localities.set(localites);
            for(let locality of localites ){
              this.uniqueLocalities().set(locality.localityName, locality.id_locality);
            }
          }
        });
    }
  }

  updateErrorMessage(type: string) {
    if (this.contactForm.get(type)?.hasError('required')) {
      this.errorMessage = 'Debes introducir un valor';
    } else if (this.contactForm.get(type)?.hasError('passwordIncomplete')){
      this.errorMessage = `La contraseña debe tener al menos una letra mayúscula y un número.`;
    } else if (this.contactForm.get(type)?.errors) {
      this.errorMessage = `No es válido: ${type}`;
    }
    return this.errorMessage;
  }


  onSubmit() {
    //Send Data
    if( this.contactForm.invalid ) return;
    if (this.isLogin()){
      this.loginUser();
    } else {
      this.registerUser();
    }
  }

  loginUser(){
    let { email, password } = this.contactForm.value;
    this.authService.checkUserLoginByEmail(email)
      .subscribe({
        next: (hash:string) => {
          // Desencrypt
          let isValidAccount:boolean = decrypt(hash, password);
          if( isValidAccount ){
            this.userLoginCheckedSuccess(hash, email);
          }else{
            this.userLoginCheckedFailure(CONSTANTES.USER_FAILD);
          }
        },
        error: (err:Error) => {
          this.userLoginCheckedFailure(CONSTANTES.USER_FAILD);
        }
      });
  }

  userLoginCheckedSuccess(hash:string, email:string){
    this.authService.loginUser(hash, email)
      .subscribe({
        next: ({ user, message }) => {
          // Encryptar token
          this._localStorage.setItem(environment.TOKEN, user);
          this.createSnackSuccefully(message);
          this.router.navigate(['/table']);
        },
        error: (err:Error) => {
          this.createSnackError(err.message);
        }
      });
  }
  userLoginCheckedFailure(message:string){
    this.createSnackError(message);
  }

  registerUser(){
    let { email, password, locality } = this.contactForm.value;
    let hashPassword = encrypt(password);
    this.authService.registerUser({ email, password:hashPassword, id_locality: locality})
      .subscribe({
        next: (user) => {
          this.createSnackSuccefully(user.message);
          this.contactForm.reset();
          this.router.navigate(['/auth/login']);
        },
        error: ({ error }:HttpErrorResponse) => {
          this.createSnackError(error.message);
          this.contactForm.markAllAsTouched();
        }
      });
  }


  createSnackError(message: string){
    this._snackBar.openFromComponent(SnackbarCustomComponent, {
      data: {
        message: message,
        action: 'close',
        snackBar: this._snackBar,
        icon: 'error',
        status: false
      },
      horizontalPosition: this.configMatSnack.horizontalPosition,
      verticalPosition: this.configMatSnack.verticalPosition,
      panelClass: 'error-snackbar',
      duration: 10000
    });
  }


  createSnackSuccefully( message: string ){
    this._snackBar.openFromComponent(SnackbarCustomComponent, {
      data: {
        message: message,
        action: 'close',
        snackBar: this._snackBar,
        icon: 'done',
        status: true
      },
      horizontalPosition: this.configMatSnack.horizontalPosition,
      verticalPosition: this.configMatSnack.verticalPosition,
      panelClass: 'success-snackbar',
      duration: 10000
    });
  }

}
