import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { PlacesService } from '@maps/services/places.service';

@Component({
  selector: 'maps-search-bar',
  standalone: true,
  imports: [CommonModule, SearchResultsComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  // Definir los tipos en los types de tsconfig*
  #debounceTime?: NodeJS.Timeout;
  #placesSerive = inject(PlacesService);
  numberItems = input<number>(0);
  public zones: Array<Record<string, string>> = [
    {
      title: 'Conform zone',
      color: 'color: green;'
    },
    {
      title: 'Warning zone',
      color: 'color: yellow;'
    },
    {
      title: 'Dangerous zone',
      color: 'color: red;'
    }
  ];

  onQueryChange(query: string = '') {

    if (this.#debounceTime) clearTimeout(this.#debounceTime);

    this.#debounceTime = setTimeout(() => {
      this.#placesSerive.getPlacesByQuery(query)
    }, 400);

  }
}
