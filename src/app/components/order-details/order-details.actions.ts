import { Action } from '@ngrx/store';

export enum EOrderDetailsActions {
  GetOrderDetailsStart = '[Order Details] Get Order Details Start',
  GetOrderDetailsSuccess = '[Order Details] Get Order Details Success',
  GetOrderDetailsFailure = '[Order Details] Get Order Details Failure',
  ConfirmOrderStart = '[Confirm Order] Confirm Order Start',
  ConfirmOrderSuccess = '[Confirm Order] Confirm Order Details Success',
  ConfirmOrderFailure = '[Confirm Order] Confirm Order Details Failure',
  ReturnOrderStart = '[Return Order] Return Order Start',
  ReturnOrderSuccess = '[Return Order] Return Order Details Success',
  ReturnOrderFailure = '[Return Order] Return Order Details Failure',
  ConfirmAllStart = '[Confirm All] Confirm All Start',
  ConfirmAllSuccess = '[Confirm All] Confirm All Success',
  ConfirmAllFailure = '[Confirm All] Confirm All Failure',
  DrawSignatureStart = '[Draw Signature] Draw Signature Start',
  DrawSignatureSuccess = '[Draw Signature] Draw Signature Success',
  DrawSignatureFailure = '[Draw Signature] Draw Signature Failure',
}

export class GetOrderDetailsStart implements Action {
  readonly type = EOrderDetailsActions.GetOrderDetailsStart;

  constructor(public payload: { data: { orderId: number } }) { }
}

export class GetOrderDetailsSuccess {
  readonly type = EOrderDetailsActions.GetOrderDetailsSuccess;

  constructor(public payload: { data: any }) { }
}

export class GetOrderDetailsFailure {
  readonly type = EOrderDetailsActions.GetOrderDetailsFailure;

  constructor(public payload: { error: any }) { }
}

export class ConfirmOrderStart implements Action {
  readonly type = EOrderDetailsActions.ConfirmOrderStart;

  constructor(public payload: { data: { orderId: number, order_line_id: number } }) { }
}

export class ConfirmOrderSuccess {
  readonly type = EOrderDetailsActions.ConfirmOrderSuccess;

  constructor(public payload: { data: any }) { }
}

export class ConfirmOrderFailure {
  readonly type = EOrderDetailsActions.ConfirmOrderFailure;
  constructor(public payload: { error: any }) { }
}

export class ReturnOrderStart implements Action {
  readonly type = EOrderDetailsActions.ReturnOrderStart;

  constructor(public payload: {
    data: {
      orderId: number, return_item:
      {
        item_id: number,
        return_quantity: number,
        reason: string
      }
    }
  }) { }
}

export class ReturnOrderSuccess {
  readonly type = EOrderDetailsActions.ReturnOrderSuccess;

  constructor(public payload: { data: any }) { }
}

export class ReturnOrderFailure {
  readonly type = EOrderDetailsActions.ReturnOrderFailure;
  constructor(public payload: { error: any }) { }
}


export class ConfirmAllStart implements Action {
  readonly type = EOrderDetailsActions.ConfirmAllStart;

  constructor(public payload: { data: { orderId: number } }) { }
}

export class ConfirmAllSuccess {
  readonly type = EOrderDetailsActions.ConfirmAllSuccess;

  constructor(public payload: { data: any }) { }
}

export class ConfirmAllFailure {
  readonly type = EOrderDetailsActions.ConfirmAllFailure;
  constructor(public payload: { error: any }) { }
}


export class DrawSignatureStart implements Action {
  readonly type = EOrderDetailsActions.DrawSignatureStart;

  constructor(public payload: { data: { orderId: number, formData: FormData } }) { }
}

export class DrawSignatureSuccess {
  readonly type = EOrderDetailsActions.DrawSignatureSuccess;

  constructor(public payload: { data: any }) { }
}

export class DrawSignatureFailure {
  readonly type = EOrderDetailsActions.DrawSignatureFailure;
  constructor(public payload: { error: any }) { }
}

export type OrderDetailsActions = GetOrderDetailsStart | GetOrderDetailsSuccess | GetOrderDetailsFailure |
  ConfirmOrderStart | ConfirmOrderSuccess | ConfirmOrderFailure |
  ReturnOrderStart | ReturnOrderSuccess | ReturnOrderFailure |
  ConfirmAllStart | ConfirmAllSuccess | ConfirmAllFailure |
  DrawSignatureStart | DrawSignatureSuccess | DrawSignatureFailure;
