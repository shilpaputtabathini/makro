import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  encode(value) {
    return btoa(value);
  }

  decode(value) {
    return atob(value);
  }
}
