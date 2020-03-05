import { Action } from '@ngrx/store';

export enum EOrdersListActions {
  GetOrdersListStart = '[Orders List] Get Orders List Start',
  GetOrdersListSuccess = '[Orders List] Get Orders List Success',
  GetOrdersListFailure = '[Orders List] Get Orders List Failure',
  GetReasonCodeStart = '[ReasonCode List] Get ReasonCode List Start',
  GetReasonCodeSuccess = '[ReasonCode List] Get ReasonCode List Success',
  GetReasonCodeFailure = '[ReasonCode List] Get ReasonCode List Failure',
  SetOrderMarkAsReadyStart = '[Orders List] Set Order Mark As Ready Start',
  SetOrderMarkAsReadySuccess = '[Orders List] Set Order Mark As Ready Success',
  SetOrderMarkAsReadyFailure = '[Orders List] Set Order Mark As Ready Failure',
  SetOrderMarkAsReattemptStart = '[Orders List] Set Order Mark As Reattempt Start',
  SetOrderMarkAsReattemptSuccess = '[Orders List] Set Order Mark As Reattempt Success',
  SetOrderMarkAsReattemptFailure = '[Orders List] Set Order Mark As Reattempt Failure',
};

export class GetOrdersListStart implements Action {
  readonly type = EOrdersListActions.GetOrdersListStart;

  constructor(public payload?: { status: any }) { }
}

export class GetOrdersListSuccess implements Action {
  readonly type = EOrdersListActions.GetOrdersListSuccess;

  constructor(public payload: { data: any }) { }
}

export class GetOrdersListFailure implements Action {
  readonly type = EOrdersListActions.GetOrdersListFailure;

  constructor(public payload: { error: any }) { }
}

export class GetReasonCodeStart implements Action {
  readonly type = EOrdersListActions.GetReasonCodeStart;

  constructor(public payload: { status: any }) { }
}

export class GetReasonCodeSuccess implements Action {
  readonly type = EOrdersListActions.GetReasonCodeSuccess;

  constructor(public payload: { data: any }) { }
}

export class GetReasonCodeFailure implements Action {
  readonly type = EOrdersListActions.GetReasonCodeFailure;

  constructor(public payload: { error: any }) { }
}

export class SetOrderMarkAsReadyStart implements Action {
  readonly type = EOrdersListActions.SetOrderMarkAsReadyStart;

  constructor(public payload: { data: { orderId: number } }) { }
}

export class SerOrderMarkAsReadySuccess implements Action {
  readonly type = EOrdersListActions.SetOrderMarkAsReadySuccess;

  constructor(public payload: { data: any }) { }
}

export class SerOrderMarkAsReadyFailure implements Action {
  readonly type = EOrdersListActions.SetOrderMarkAsReadyFailure;

  constructor(public payload: { error: any }) { }
}

export class SetOrderMarkAsReattemptStart implements Action {
  readonly type = EOrdersListActions.SetOrderMarkAsReattemptStart;

  constructor(public payload: { data: { orderId: number, reason: string, returnOrderNumber: number } }) { }
}

export class SetOrderMarkAsReattemptSuccess implements Action {
  readonly type = EOrdersListActions.SetOrderMarkAsReattemptSuccess;

  constructor(public payload: { data: any }) { }
}

export class SetOrderMarkAsReattemptFailure implements Action {
  readonly type = EOrdersListActions.SetOrderMarkAsReattemptFailure;

  constructor(public payload: { error: any }) { }
}

export type OrdersListActions = GetOrdersListStart | GetOrdersListSuccess | GetOrdersListFailure | GetReasonCodeStart |
  GetReasonCodeSuccess | GetReasonCodeFailure | SetOrderMarkAsReadyStart | SerOrderMarkAsReadySuccess | SerOrderMarkAsReadyFailure |
  SetOrderMarkAsReattemptStart | SetOrderMarkAsReattemptSuccess | SetOrderMarkAsReattemptFailure;
