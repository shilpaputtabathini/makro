import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { OrderService } from 'src/app/core/services/order.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { EOrderRefundActions, CancelOrderStart, CancelOrderSuccess, CancelOrderFailure } from './order-refund.actions';

@Injectable()
export class OrderRefundEffects {
  @Effect() cancelOrder$;

  constructor(
    private _orderService: OrderService,
    private _actions$: Actions
  ) {
    this.cancelOrder$ = this._actions$.pipe(
      ofType(EOrderRefundActions.CancelOrderStart),
      switchMap((action: CancelOrderStart) => {
        return this._orderService.cancelOrder(action.payload.data).pipe(
          map((res: any) => {
            if (res && res.hasOwnProperty('status') && res.status === 'ERROR') {
              return new CancelOrderFailure({ error: res });
            }

            return new CancelOrderSuccess({ data: res });
          }),
          catchError((err: Error) => of(new CancelOrderFailure({ error: err })))
        );
      })
    );
  }

}
