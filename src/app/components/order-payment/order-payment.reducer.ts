import { OrderPaymentActions, EOrderPaymentActions } from './order-payment.actions';

export interface IOrderPaymentState {
  orderPayment: any;
  orderPaymentError: any;
}

export const initialOrderPaymentState: IOrderPaymentState = {
  orderPayment: null,
  orderPaymentError: null
};

export function orderPaymentReducer(state = initialOrderPaymentState, action: OrderPaymentActions): IOrderPaymentState {
  switch (action.type) {
    case EOrderPaymentActions.PaymentUpdateOrderStart:
      return {
        ...state
      };
    case EOrderPaymentActions.PaymentUpdateOrderSuccess:
      return {
        ...state,
        orderPayment: action.payload.data,
        orderPaymentError: null
      };
    case EOrderPaymentActions.PaymentUpdateOrderFailure:
      return {
        ...state,
        orderPaymentError: action.payload.error,
        orderPayment: null
      };
    default:
      return state;
  }
}
