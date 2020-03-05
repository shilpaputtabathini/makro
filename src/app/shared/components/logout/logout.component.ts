import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  authData: any;

  constructor(
    private _authService: AuthService
  ) {
    this.authData = this.getAuthData();
  }

  ngOnInit() { }

  onLogout() {
    this._authService.logout();
  }

  getAuthData() {
    return this._authService.getAuthData();
  }
}
