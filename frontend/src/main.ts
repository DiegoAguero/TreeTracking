import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import Mapboxgl from 'mapbox-gl';
import { environment } from './environments/environments';


Mapboxgl.accessToken = environment.TOKEN_MAP_BOX;

if (!navigator.geolocation) {
  alert('No soport Geolocation');
  throw new Error('No soport Geolocation');
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
