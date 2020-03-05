import { Injectable } from '@angular/core';

import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageApi = localStorage; // API Options :- localStorage or sessionStorage

  constructor(
    private _utilService: UtilsService
  ) { }

  getItem(key) {
    return this.storageApi.getItem(key) ? JSON.parse(this._utilService.decode(this.storageApi.getItem(key))) : null;
  }

  setItem(key, value) {
    this.storageApi[key] = this._utilService.encode(JSON.stringify(value));
    return this.getItem(key);
  }

  removeItem(key) {
    this.storageApi.removeItem(key);
  }

  clearAll() {
    this.storageApi.clear();
  }
}

