import { LoginActions, ELoginActions } from './login.actions';

export interface ILoginState {
  loginSuccessData: any;
  loginFailureData: any;
}

export const initialLoginState: ILoginState = {
  loginSuccessData: null,
  loginFailureData: null
};

export function loginReducer(state = initialLoginState, action: LoginActions): ILoginState {
  switch (action.type) {
    case ELoginActions.LoginStart:
      return {
        ...state
      };
    case ELoginActions.LoginSuccess:
      return {
        ...state,
        loginSuccessData: action.payload.data,
        loginFailureData: null
      };
    case ELoginActions.LoginFailure:
      return {
        ...state,
        loginFailureData: action.payload.error,
        loginSuccessData: null
      };
    default:
      return state;
  }
};
