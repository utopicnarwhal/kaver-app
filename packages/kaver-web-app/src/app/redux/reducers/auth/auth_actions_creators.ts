// Import redux types
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

// Business domain imports
import {
  AuthActionTypes,
  IAuthLoginStartAction,
  IAuthLoginSuccessAction,
  IAuthLoginFailureAction,
  IAuthAction
} from "./auth_actions";
import IAuthState from "./auth_state";
import AuthDataSource from "./auth_data_source";

export const loginStart = (): IAuthLoginStartAction => {
  return {
    type: AuthActionTypes.LOGIN_START
  };
};

export const loginSuccess = (): IAuthLoginSuccessAction => {
  return {
    type: AuthActionTypes.LOGIN_SUCCESS
  };
};

export const loginFailure = (message: string): IAuthLoginFailureAction => {
  return {
    type: AuthActionTypes.LOGIN_FAILURE,
    message
  };
};

// <Promise<Return Type>, State Interface, Type of Param, Type of Action>
export const login: ActionCreator<ThunkAction<
  Promise<any>,
  IAuthState,
  null,
  IAuthAction
>> = (username: string, password) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginStart());

    return AuthDataSource.login(username, password)
      .then((response) => {
        console.log(response);
        dispatch(loginSuccess());
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFailure(error?.toString()));
      });
  };
};

// <Promise<Return Type>, State Interface, Type of Param, Type of Action>
export const fetchUserData: ActionCreator<ThunkAction<
  Promise<any>,
  IAuthState,
  null,
  IAuthAction
>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loginStart());

    return AuthDataSource.fetch_user_data()
      .then((response) => {
        console.log(response);
        dispatch(loginSuccess());
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFailure(error?.toString()));
      });
  };
};
