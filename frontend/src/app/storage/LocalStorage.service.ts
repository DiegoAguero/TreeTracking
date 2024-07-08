import { Injectable } from '@angular/core';
import { StorageService } from './StorageService';

@Injectable({ providedIn: 'root' })
export class LocalStorageService extends StorageService {
  constructor() {
    super(window.localStorage);
  }
}
