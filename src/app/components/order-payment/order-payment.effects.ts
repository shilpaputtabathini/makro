import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { OrderService } from './../../core/services/order.service';
import { of } from 'rxjs';
import { EOrderPaymentActions, PaymentUpdateOrderStart, PaymentUpdateOrderSuccess, PaymentUpdateOrderFailure } from './order-payment.actions';

@Injectable()
export class OrderPaymentEffects {
  @Effect() getPaymentType$;

  constructor(
    private _orderService: OrderService,
    private _actions$: Actions
  ) {
    this.getPaymentType$ = this._actions$.pipe(
      ofType(EOrderPaymentActions.PaymentUpdateOrderStart),
      switchMap((action: PaymentUpdateOrderStart) => {
        return this._orderService.getTypeOfPaymentIS(action.payload.data).pipe(
          map(res => new PaymentUpdateOrderSuccess({ data: res })),
          catchError((err: Error) => of(new PaymentUpdateOrderFailure({ error: err })))
        );
      })
    );
  }

}
