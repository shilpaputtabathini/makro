import { OrderRefundActions, EOrderRefundActions } from './order-refund.actions';

export interface IOrderRefundState {
  orderRefund: any;
  orderRefundError: any;
}

export const initialOrderRefundState: IOrderRefundState = {
  orderRefund: null,
  orderRefundError: null
};

export function orderRefundReducer(state = initialOrderRefundState, action: OrderRefundActions): IOrderRefundState {
  switch (action.type) {
    case EOrderRefundActions.CancelOrderStart:
      return {
        ...state
      };
    case EOrderRefundActions.CancelOrderSuccess:
      return {
        ...state,
        orderRefund: action.payload.data,
        orderRefundError: null
      };
    case EOrderRefundActions.CancelOrderFailure:
      return {
        ...state,
        orderRefundError: action.payload.error,
        orderRefund: null
      };
    default:
      return state;
  }
}
