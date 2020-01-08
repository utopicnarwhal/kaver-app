import { IAuthAction, AuthActionTypes } from "./auth_actions";
import { Reducer } from "redux";
import IAuthState from "./auth_state";

const initialState = {
  isAuth: false
} as IAuthState;

export const AuthReducer: Reducer<IAuthState, IAuthAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_START:
    case AuthActionTypes.REGISTER_START: {
      return {
        ...state
      };
    }
    case AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state
      };
    }
    case AuthActionTypes.SIGN_OUT_START: {
      return {
        ...state
      };
    }
    case AuthActionTypes.FETCH_USER_DATA_START: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};
