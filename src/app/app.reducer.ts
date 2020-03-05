import { ActionReducerMap } from '@ngrx/store';

import { ILoginState, initialLoginState, loginReducer } from './components/login/login.reducer';
import { initialOrdersListState, IOrdersListState, ordersListReducer } from './components/orders-list/orders-list.reducer';
import { orderDetailsReducer, IOrderDetailsState, initialOrderDetailsState } from './components/order-details/order-details.reducer';
import { IOrderRefundState, initialOrderRefundState, orderRefundReducer } from './components/order-refund/order-refund.reducer';
import { IOrderPaymentState, initialOrderPaymentState, orderPaymentReducer } from './components/order-payment/order-payment.reducer';

export interface IAppState {
  loginData: ILoginState,
  ordersListData: IOrdersListState,
  orderDetailsData: IOrderDetailsState,
  orderRefundData: IOrderRefundState,
  orderPaymentData: IOrderPaymentState
}

export const initialAppState: IAppState = {
  loginData: initialLoginState,
  ordersListData: initialOrdersListState,
  orderDetailsData: initialOrderDetailsState,
  orderRefundData: initialOrderRefundState,
  orderPaymentData: initialOrderPaymentState
}

export const appReducer: ActionReducerMap<IAppState, any> = {
  loginData: loginReducer,
  ordersListData: ordersListReducer,
  orderDetailsData: orderDetailsReducer,
  orderRefundData: orderRefundReducer,
  orderPaymentData: orderPaymentReducer
}
