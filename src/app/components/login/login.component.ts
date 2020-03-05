import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, ActionsSubject } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IAppState } from 'src/app/app.reducer';
import { LoginStart, ELoginActions } from './login.actions';
import { STORAGE } from 'src/app/core/constants/storage.constant';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  activeField: string;
  showPassword: boolean = false;
  formSubmitted: boolean = false;
  actionsSubjectSubscription: Subscription;

  get useridControl() {
    return this.loginForm.get('userid');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  constructor(
    private _fb: FormBuilder,
    private _store: Store<IAppState>,
    private _actionsSubject: ActionsSubject,
    private _router: Router,
    private _storageService: StorageService
  ) {
    this.loginForm = this._fb.group({
      userid: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.actionsSubjectSubscription = this._actionsSubject.subscribe((action: any) => {
      switch (action.type) {
        case ELoginActions.LoginStart:
          break;
        case ELoginActions.LoginSuccess:
          this._storageService.setItem(STORAGE.AUTH_DATA, action.payload.data);
          this._storageService.setItem(STORAGE.ACCESS_TOKEN, action.payload.data.access_token);
          this._router.navigate(['/dashboard']);
          break;
        case ELoginActions.LoginFailure:
          alert(action.payload.error.error.error_description);
          break;
      }
    });
  }

  ngOnInit() {
  }

  onLogin() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const data = { ...this.loginForm.value };
    data['grant_type'] = 'password';
    this._store.dispatch(new LoginStart({ data }));
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy() {
    this.actionsSubjectSubscription.unsubscribe();
  }
}
