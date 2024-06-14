import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  onQueryChange(query: string = '') {

    if (this.#debounceTime) clearTimeout(this.#debounceTime);

    this.#debounceTime = setTimeout(() => {
      this.#placesSerive.getPlacesByQuery(query)
    }, 400);

  }
}
