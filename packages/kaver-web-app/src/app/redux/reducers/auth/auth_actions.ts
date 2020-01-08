export enum AuthActionTypes {
  LOGIN_START = "LOGIN_START",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",

  REGISTER_START = "REGISTER_START",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILURE = "REGISTER_FAILURE",

  SIGN_OUT_START = "SIGN_OUT_START",
  SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE",

  FETCH_USER_DATA_START = "FETCH_USER_DATA_START",
  FETCH_USER_DATA_SUCCESS = "FETCH_USER_DATA_SUCCESS",
  FETCH_USER_DATA_FAILURE = "FETCH_USER_DATA_FAILURE"
}

export interface IAuthLoginStartAction {
  type: typeof AuthActionTypes.LOGIN_START;
}

export interface IAuthLoginSuccessAction {
  type: typeof AuthActionTypes.LOGIN_SUCCESS;
}

export interface IAuthLoginFailureAction {
  type: typeof AuthActionTypes.LOGIN_FAILURE;
  message: string;
}

export interface IAuthRegisterStartAction {
  type: typeof AuthActionTypes.REGISTER_START;
}

export interface IAuthRegisterSuccessAction {
  type: typeof AuthActionTypes.REGISTER_SUCCESS;
}

export interface IAuthRegisterFailureAction {
  type: typeof AuthActionTypes.REGISTER_FAILURE;
  message: string;
}

export interface IAuthSignOutStartAction {
  type: typeof AuthActionTypes.SIGN_OUT_START;
}

export interface IAuthSignOutSuccessAction {
  type: typeof AuthActionTypes.SIGN_OUT_SUCCESS;
}

export interface IAuthSignOutFailureAction {
  type: typeof AuthActionTypes.SIGN_OUT_FAILURE;
  message: string;
}

export interface IAuthFetchUserDataStartAction {
  type: typeof AuthActionTypes.FETCH_USER_DATA_START;
}

export interface IAuthFetchUserDataSuccessAction {
  type: typeof AuthActionTypes.FETCH_USER_DATA_SUCCESS;
}

export interface IAuthFetchUserDataFailureAction {
  type: typeof AuthActionTypes.FETCH_USER_DATA_FAILURE;
  message: string;
}

export type IAuthAction =
  | IAuthLoginStartAction
  | IAuthLoginSuccessAction
  | IAuthLoginFailureAction
  | IAuthRegisterStartAction
  | IAuthRegisterSuccessAction
  | IAuthRegisterFailureAction
  | IAuthSignOutStartAction
  | IAuthSignOutSuccessAction
  | IAuthSignOutFailureAction
  | IAuthFetchUserDataStartAction
  | IAuthFetchUserDataSuccessAction
  | IAuthFetchUserDataFailureAction;
