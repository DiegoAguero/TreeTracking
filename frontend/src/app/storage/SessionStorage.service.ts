import { Injectable } from '@angular/core';
import { StorageService } from './StorageService';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService extends StorageService {
  constructor() {
    super(window.sessionStorage);
  }
}
