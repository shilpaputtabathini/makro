import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { ELoginActions, LoginActions, LoginStart, LoginSuccess, LoginFailure } from './login.actions';
import { AuthService } from 'src/app/core/services/auth.service';


@Injectable()
export class LoginEffects {
  @Effect() login$;

  constructor(
    private _authService: AuthService,
    private _actions$: Actions
  ) {

    this.login$ = this._actions$.pipe(
      ofType(ELoginActions.LoginStart),
      switchMap((action: LoginStart) => {
        return this._authService.login(action.payload.data).pipe(
          map(res => new LoginSuccess({ data: res })),
          catchError((err: Error) => of(new LoginFailure({ error: err })))
        )
      })
    );
  }

}
