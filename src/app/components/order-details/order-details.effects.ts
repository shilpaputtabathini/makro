import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { OrderService } from 'src/app/core/services/order.service';
import { EOrderDetailsActions, GetOrderDetailsStart, GetOrderDetailsSuccess, GetOrderDetailsFailure, ConfirmOrderStart, ConfirmOrderSuccess, ConfirmOrderFailure, ReturnOrderStart, ReturnOrderSuccess, ReturnOrderFailure, ConfirmAllStart, ConfirmAllSuccess, ConfirmAllFailure, DrawSignatureStart, DrawSignatureSuccess, DrawSignatureFailure } from './order-details.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class OrderDetailsEffects {
  @Effect() getOrderDetails$;
  @Effect() confirmOrder$;
  @Effect() returnOrder$;
  @Effect() confirmAll$;
  @Effect() drawSignature$;

  constructor(
    private _orderService: OrderService,
    private _actions$: Actions
  ) {
    this.getOrderDetails$ = this._actions$.pipe(
      ofType(EOrderDetailsActions.GetOrderDetailsStart),
      switchMap((action: GetOrderDetailsStart) => {
        return this._orderService.getOrderDetails(action.payload.data.orderId).pipe(
          map(res => new GetOrderDetailsSuccess({ data: res })),
          catchError((err: Error) => of(new GetOrderDetailsFailure({ error: err })))
        )
      })
    );

    this.confirmOrder$ = this._actions$.pipe(
      ofType(EOrderDetailsActions.ConfirmOrderStart),
      switchMap((action: ConfirmOrderStart) => {
        return this._orderService.confirmOrderLine(action.payload.data).pipe(
          map(res => new ConfirmOrderSuccess({ data: res })),
          catchError((err: Error) => of(new ConfirmOrderFailure({ error: err })))
        )
      })
    );

    this.returnOrder$ = this._actions$.pipe(
      ofType(EOrderDetailsActions.ReturnOrderStart),
      switchMap((action: ReturnOrderStart) => {
        return this._orderService.returnOrderline(action.payload.data).pipe(
          map(res => new ReturnOrderSuccess({ data: res })),
          catchError((err: Error) => of(new ReturnOrderFailure({ error: err })))
        )
      })
    );

    this.confirmAll$ = this._actions$.pipe(
      ofType(EOrderDetailsActions.ConfirmAllStart),
      switchMap((action: ConfirmAllStart) => {
        return this._orderService.confirmAll(action.payload.data.orderId).pipe(
          map(res => new ConfirmAllSuccess({ data: res })),
          catchError((err: Error) => of(new ConfirmAllFailure({ error: err })))
        )
      })
    );

    this.drawSignature$ = this._actions$.pipe(
      ofType(EOrderDetailsActions.DrawSignatureStart),
      switchMap((action: DrawSignatureStart) => {
        return this._orderService.drawSignature(action.payload.data.orderId, action.payload.data.formData).pipe(
          map(res => new DrawSignatureSuccess({ data: res })),
          catchError((err: Error) => of(new DrawSignatureFailure({ error: err })))
        )
      })
    );
  }

}
