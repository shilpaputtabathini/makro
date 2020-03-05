import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { STORAGE } from '../constants/storage.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _storageService: StorageService
  ) { }

  getToken() {
    return `Bearer ${this._storageService.getItem(STORAGE.ACCESS_TOKEN)}`;
  }

  login(data) {
    return this._http.post(`${this.apiUrl}${API_ENDPOINTS.LOGIN}`, data);
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  getAuthData() {
    return this._storageService.getItem(STORAGE.AUTH_DATA);
  }

  isLoggedIn() {
    const accessToken = this._storageService.getItem(STORAGE.ACCESS_TOKEN);
    const authData = this._storageService.getItem(STORAGE.AUTH_DATA);

    return accessToken && authData;
  }
}
