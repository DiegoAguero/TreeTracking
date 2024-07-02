import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { PlacesService } from '@maps/services/places.service';
import { CoreService } from '@core/services/core.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'


const MAT_MODULES = [MatInputModule, MatFormFieldModule];
@Component({
  selector: 'maps-search-bar',
  standalone: true,
  imports: [CommonModule, SearchResultsComponent, FormsModule, MAT_MODULES],
  templateUrl: './search-bar.component.html',
  styles: `
    .search-container {
      position: fixed;
      width: 50%;
      top: 1rem;
      padding: .4rem;
    }
    .search-container::-webkit-scrollbar{
      width: .5rem;
    }
  `
})
export class SearchBarComponent {

  // Definir los tipos en los types de tsconfig*
  #debounceTime?: NodeJS.Timeout;
  readonly #placesSerive = inject(PlacesService);
  readonly #coreService = inject(CoreService);

  onQueryChange(query: string = '') {
    if(!this.#coreService.userLocationComputed()) return;
    if (this.#debounceTime) clearTimeout(this.#debounceTime);
    this.#debounceTime = setTimeout(() => {
      let result = query ? this.#coreService.getZonesByTerm(query): [];
      this.#placesSerive.getPlacesByQuery(result, this.#coreService.userLocationComputed()! )
    }, 400);

  }
}
