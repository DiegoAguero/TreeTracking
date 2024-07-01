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


const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, MatButtonModule, MatSelectModule, MatIconModule]
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MATERIAL_MODULES, ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styles: `
  `
})
export default class LoginComponent implements OnInit {

  public contactForm!: FormGroup;
  private readonly router = inject(Router);
  public isLogin = signal<boolean>(false);
  public errorMessage!: string;
  private readonly authService = inject(AuthService);
  public localities = signal<Locality[]>([]);
  public countries = signal<CountryData[]>([]);
  public hidePassword = signal<boolean>(true);
  public hidePasswordConfirm = signal<boolean>(true);


  constructor(){
    this.isLogin.set( this.router.url.includes('login') );
    if (this.isLogin()) {
      this.contactForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, ValidatorsCustom.passwordLength()]),
      })
    } else {
      this.contactForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, ValidatorsCustom.passwordLength()]),
        confirmPassword: new FormControl('', [Validators.required]),
        country: new FormControl('', []),
        locality: new FormControl('', [])
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
    // We search for the name by the id
    const country = this.countries().find((country) => country.id_country === this.contactForm.get('country')!.value );
    if( country ){
      this.authService.getLocality(country.countryName)
        .subscribe({
          next: (localites) => this.localities.set(localites),
        });
    }
  }

  updateErrorMessage(type: string) {
    console.log(this.contactForm.get(type)?.errors)
    if (this.contactForm.get(type)?.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.contactForm.get(type)?.errors) {
      this.errorMessage = `Not a valid ${type}`;
    } else {
      this.errorMessage = 'Not found';
    }
    return this.errorMessage;
  }

  onSubmit() {
    //Send Data
  }

}
