import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { InformationGenericComponent } from '@shared/components/information-generic/information-generic.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [InformationGenericComponent, NgOptimizedImage ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export default class HomePageComponent {

}
