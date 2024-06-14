import { Component, Input } from '@angular/core';
import { RouterLink, Routes } from '@angular/router';
import { routersLinksI } from '../../../interfaces/routes.interface';
// import { routersLinksI } from '@interfaces/routes.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input({
    required: true, transform: (value:Routes) => {
      if( !value ) return value;
      return value.map( ({ path, title, children })=> {
          return {
            path,
            title,
            children
          } as routersLinksI
      }).filter( rou => rou.path !== '**' );
    }
  }) defineRoute!: routersLinksI[];

  ngOnInit(): void {

  }
}
