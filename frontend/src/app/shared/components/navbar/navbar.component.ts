import { Component, Input, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { routersLinksI } from '../../../core/interfaces/routes.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent  {
  @Input({
    required: true, transform: (value:Routes) => {
      if( !value ) return value;
      return value.map( ({ path, title, children }) => {
          return {
            path,
            title,
            children
          } as routersLinksI
      }).filter( rou => rou.title !== '' && rou.path !== '');
    }
  }) defineRoute!: routersLinksI[];

  sidebarVisible: boolean = false;

  showHideNav(el: HTMLDivElement){
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
  }
}
