import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { OrderService } from 'src/app/core/services/order.service';
import { EOrdersListActions, GetOrdersListStart, GetOrdersListSuccess, GetOrdersListFailure, GetReasonCodeStart, GetReasonCodeSuccess, GetReasonCodeFailure, SetOrderMarkAsReadyStart, SetOrderMarkAsReattemptStart, SerOrderMarkAsReadySuccess, SerOrderMarkAsReadyFailure, SetOrderMarkAsReattemptSuccess, SetOrderMarkAsReattemptFailure } from './orders-list.actions';

@Injectable()
export class OrdersListEffects {
  @Effect() getOrdersList$;
  @Effect() getReasonCodeList$;
  @Effect() setOrderMarkAsReady$;
  @Effect() setOrderMarkAsReattempt$;

  constructor(
    private _orderService: OrderService,
    private _actions$: Actions
  ) {

    this.getOrdersList$ = this._actions$.pipe(
      ofType(EOrdersListActions.GetOrdersListStart),
      switchMap((action: GetOrdersListStart) => {
        return this._orderService.getOrdersList(action.payload.status || null).pipe(
          map(res => new GetOrdersListSuccess({ data: res })),
          catchError((err: Error) => of(new GetOrdersListFailure({ error: err })))
        )
      })
    );

    this.getReasonCodeList$ = this._actions$.pipe(
      ofType(EOrdersListActions.GetReasonCodeStart),
      switchMap((action: GetReasonCodeStart) => {
        return this._orderService.getReasonCodes(action.payload.status).pipe(
          map(res => new GetReasonCodeSuccess({ data: res })),
          catchError((err: Error) => of(new GetReasonCodeFailure({ error: err })))
        );
      })
    );

    this.setOrderMarkAsReady$ = this._actions$.pipe(
      ofType(EOrdersListActions.SetOrderMarkAsReadyStart),
      switchMap((action: SetOrderMarkAsReadyStart) => {
        return this._orderService.setOrderMarkAsReady(action.payload.data.orderId).pipe(
          map(res => new SerOrderMarkAsReadySuccess({ data: res })),
          catchError((err: Error) => of(new SerOrderMarkAsReadyFailure({ error: err })))
        );
      })
    );

    this.setOrderMarkAsReattempt$ = this._actions$.pipe(
      ofType(EOrdersListActions.SetOrderMarkAsReattemptStart),
      switchMap((action: SetOrderMarkAsReattemptStart) => {
        return this._orderService.setOrderMarkAsReattempt(action.payload.data.orderId, action.payload.data.reason, action.payload.data.returnOrderNumber).pipe(
          map(res => new SetOrderMarkAsReattemptSuccess({ data: res })),
          catchError((err: Error) => of(new SetOrderMarkAsReattemptFailure({ error: err })))
        );
      })
    )
  }

}
