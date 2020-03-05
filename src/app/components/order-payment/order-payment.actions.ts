import { Action } from '@ngrx/store';

export enum EOrderPaymentActions {
  PaymentUpdateOrderStart = '[Order PaymentUpdate] Get Order PaymentUpdate Start',
  PaymentUpdateOrderSuccess = '[Order PaymentUpdate] Get Order PaymentUpdate Success',
  PaymentUpdateOrderFailure = '[Order PaymentUpdate] Get Order PaymentUpdate Failure'
}

export class PaymentUpdateOrderStart implements Action {
  readonly type = EOrderPaymentActions.PaymentUpdateOrderStart;

  constructor(public payload: { data: { orderId: number } }) { }
}

export class PaymentUpdateOrderSuccess {
  readonly type = EOrderPaymentActions.PaymentUpdateOrderSuccess;

  constructor(public payload: { data: any }) { }
}

export class PaymentUpdateOrderFailure {
  readonly type = EOrderPaymentActions.PaymentUpdateOrderFailure;

  constructor(public payload: { error: any }) { }
}

export type OrderPaymentActions = PaymentUpdateOrderStart | PaymentUpdateOrderSuccess | PaymentUpdateOrderFailure;
