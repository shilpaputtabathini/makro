import { EOrdersListActions, OrdersListActions } from './orders-list.actions';

export interface IOrdersListState {
  ordersList: any;
  ordersListError: any;
  reattemptOrderSuccess: any;
  reattemptOrderFailure: any;
}

export const initialOrdersListState: IOrdersListState = {
  ordersList: null,
  ordersListError: null,
  reattemptOrderSuccess: null,
  reattemptOrderFailure: null
};

export function ordersListReducer(state = initialOrdersListState, action: OrdersListActions): IOrdersListState {
  switch (action.type) {
    case EOrdersListActions.GetOrdersListStart:
      return {
        ...state
      };
    case EOrdersListActions.GetOrdersListSuccess:
      return {
        ...state,
        ordersList: action.payload.data,
        ordersListError: null
      };
    case EOrdersListActions.GetOrdersListFailure:
      return {
        ...state,
        ordersListError: action.payload.error,
        ordersList: null
      };
    case EOrdersListActions.GetReasonCodeStart:
      return {
        ...state
      };
    case EOrdersListActions.GetReasonCodeSuccess:
      return {
        ...state,
        ordersList: action.payload.data,
        ordersListError: null
      };
    case EOrdersListActions.GetReasonCodeFailure:
      return {
        ...state,
        ordersListError: action.payload.error,
        ordersList: null
      };
    case EOrdersListActions.SetOrderMarkAsReadySuccess:
      return {
        ...state,
        reattemptOrderSuccess: action.payload.data,
        reattemptOrderFailure: null
      };
    case EOrdersListActions.SetOrderMarkAsReadyFailure:
      return {
        ...state,
        reattemptOrderFailure: action.payload.error,
        reattemptOrderSuccess: null
      };
    case EOrdersListActions.SetOrderMarkAsReattemptSuccess:
      return {
        ...state,
        reattemptOrderSuccess: action.payload.data,
        reattemptOrderFailure: null
      };
    case EOrdersListActions.SetOrderMarkAsReattemptFailure:
      return {
        ...state,
        reattemptOrderFailure: action.payload.error,
        reattemptOrderSuccess: null
      };
    default:
      return state;
  }
};
