import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AuthService } from '@routes/auth/services/auth.service';
import { InformationGenericComponent } from '@shared/components/information-generic/information-generic.component';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [InformationGenericComponent, NgOptimizedImage],
  templateUrl: './home-page.component.html',
  styles: ``
})
export default class HomePageComponent {
  private readonly authService = inject(AuthService);
  public isLoggedUser = computed( () => this.authService.userIsLogged() );
  constructor(){}
}
