import { Action } from '@ngrx/store';

export enum ELoginActions {
  LoginStart = '[Login] Login Start',
  LoginSuccess = '[Login] Login Success',
  LoginFailure = '[Login] Login Failure'
};

export class LoginStart implements Action {
  readonly type = ELoginActions.LoginStart;

  constructor(public payload: { data: any }) { }
}

export class LoginSuccess implements Action {
  readonly type = ELoginActions.LoginSuccess;

  constructor(public payload: { data: any }) { }
}

export class LoginFailure implements Action {
  readonly type = ELoginActions.LoginFailure;

  constructor(public payload: { error: any }) { }
}

export type LoginActions = LoginStart | LoginSuccess | LoginFailure;
