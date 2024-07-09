import { Component, computed, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { routersLinksI } from '../../../core/interfaces/routes.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '@routes/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';


const MAT_MODULE = [MatIconModule];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule, MAT_MODULE],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  public tokenComputed = computed(() => {
    return this.authService.userIsLogged();
  });
  private subcriptions!: Subscription;

  public routesAuth = signal<routersLinksI[]>([]);

  constructor(){
    this.subcriptions = this.authService.checkTokenEmpty().subscribe();
  }
  ngOnDestroy(): void {
    this.subcriptions.unsubscribe();
  }
  ngOnInit(): void {
    const tempRoutes: routersLinksI[] = []
    this.defineRoute = this.defineRoute.filter(route => {
      if (route.haveCan) {
        tempRoutes.push(route);
        return false;
      }
      return true;
    });
    this.routesAuth.set(tempRoutes);
  }

  @Input({
    required: true, transform: (value:Routes) => {
      if( !value ) return value;
      return value.map( ({ path, title, children, canActivate, data }) => {
          return {
            path,
            title,
            children,
            haveCan: canActivate ? true : false,
            icon: data?.['icon'] ? data?.['icon'] : 'more_horiz'
          } as routersLinksI;
      }).filter( rou => rou.title !== '' && rou.path !== '');
    }
  }) defineRoute!: routersLinksI[];

  sidebarVisible: boolean = false;

  showHideNav(el: HTMLDivElement, logout:boolean = false){
    if( el.classList.contains('hidden') ){
      el.animate([
          { height: '0px', opacity: 0 },
          { height: 'auto', opacity: 1 }
        ], {
          duration: 200,
          easing: 'ease-out',
          fill: 'forwards'
        }).onfinish = () => {
          el.classList.remove('hidden');
        }
    }
    else{
      el.animate([
        { height: 'auto', opacity: 1 },
        { height: '0px', opacity: 0 }
      ], {
        duration: 200,
        easing: 'ease-in',
        fill: 'forwards'
      }).onfinish = () => {
        el.classList.add('hidden');
      };
    }

    if( logout ){
      this.authService.logoutUser();
    }
  }
}
