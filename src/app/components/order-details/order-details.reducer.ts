import { OrderDetailsActions, EOrderDetailsActions } from './order-details.actions';

export interface IOrderDetailsState {
  orderDetails: any;
  orderDetailsError: any;
  confirmAllSuccess: any;
  confirmAllFailure: any;
  drawSignatureSuccess: any;
  drawSignatureFailure: any;
}

export const initialOrderDetailsState: IOrderDetailsState = {
  orderDetails: null,
  orderDetailsError: null,
  confirmAllSuccess: null,
  confirmAllFailure: null,
  drawSignatureSuccess: null,
  drawSignatureFailure: null
};

export function orderDetailsReducer(state = initialOrderDetailsState, action: OrderDetailsActions): IOrderDetailsState {
  switch (action.type) {
    case EOrderDetailsActions.GetOrderDetailsStart:
      return {
        ...state
      }
    case EOrderDetailsActions.GetOrderDetailsSuccess:
      return {
        ...state,
        orderDetails: action.payload.data,
        orderDetailsError: null
      }
    case EOrderDetailsActions.GetOrderDetailsFailure:
      return {
        ...state,
        orderDetailsError: action.payload.error,
        orderDetails: null
      }
    case EOrderDetailsActions.ConfirmOrderStart:
      return {
        ...state
      }
    case EOrderDetailsActions.ConfirmOrderSuccess:
      return {
        ...state,
        orderDetails: action.payload.data,
        orderDetailsError: null
      }
    case EOrderDetailsActions.ConfirmOrderFailure:
      return {
        ...state,
        orderDetailsError: action.payload.error,
        orderDetails: null
      }
    case EOrderDetailsActions.ReturnOrderStart:
      return {
        ...state
      }
    case EOrderDetailsActions.ReturnOrderSuccess:
      return {
        ...state,
        orderDetails: action.payload.data,
        orderDetailsError: null
      }
    case EOrderDetailsActions.ReturnOrderFailure:
      return {
        ...state,
        orderDetailsError: action.payload.error,
        orderDetails: null
      }
    case EOrderDetailsActions.ConfirmAllStart:
      return {
        ...state
      }
    case EOrderDetailsActions.ConfirmAllSuccess:
      return {
        ...state,
        confirmAllSuccess: action.payload.data,
        confirmAllFailure: null
      }
    case EOrderDetailsActions.ConfirmAllFailure:
      return {
        ...state,
        confirmAllFailure: action.payload.error,
        confirmAllSuccess: null
      }
    case EOrderDetailsActions.DrawSignatureStart:
      return {
        ...state
      }
    case EOrderDetailsActions.DrawSignatureSuccess:
      return {
        ...state,
        drawSignatureSuccess: action.payload.data,
        drawSignatureFailure: null
      }
    case EOrderDetailsActions.DrawSignatureFailure:
      return {
        ...state,
        drawSignatureFailure: action.payload.error,
        drawSignatureSuccess: null
      }
    default:
      return state;
  }
}
