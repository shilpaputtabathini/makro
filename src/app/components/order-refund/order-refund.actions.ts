import { Action } from '@ngrx/store';

export enum EOrderRefundActions {
  CancelOrderStart = '[Order Cancel] Get Order Cancel Start',
  CancelOrderSuccess = '[Order Cancel] Get Order Cancel Success',
  CancelOrderFailure = '[Order Cancel] Get Order Cancel Failure'
}

export class CancelOrderStart implements Action {
  readonly type = EOrderRefundActions.CancelOrderStart;

  constructor(public payload: { data: { orderId: number, reason: string } }) { }
}

export class CancelOrderSuccess {
  readonly type = EOrderRefundActions.CancelOrderSuccess;

  constructor(public payload: { data: any }) { }
}

export class CancelOrderFailure {
  readonly type = EOrderRefundActions.CancelOrderFailure;

  constructor(public payload: { error: any }) { }
}

export type OrderRefundActions = CancelOrderStart | CancelOrderSuccess | CancelOrderFailure;
