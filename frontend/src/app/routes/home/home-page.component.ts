import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { InformationGenericComponent } from '@shared/components/information-generic/information-generic.component';
import { InputRangeComponent } from '@shared/components/input-range/input-range.component';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [InformationGenericComponent, NgOptimizedImage, InputRangeComponent ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export default class HomePageComponent {

  rangeMock = {
    min: 10,
    max: 100,
    initValue: 10,
  }
}
