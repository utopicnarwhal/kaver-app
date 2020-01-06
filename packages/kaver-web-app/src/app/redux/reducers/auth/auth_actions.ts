export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const SIGN_OUT = "SIGN_OUT";
export const FETCH_USER_DATA = "FETCH_USER_DATA";

export interface AuthLoginAction {
    type: typeof LOGIN;
    username: string;
    password: string;
}

export interface AuthRegisterAction {
    type: typeof REGISTER;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
}

export interface AuthSignOutAction {
    type: typeof SIGN_OUT;
}

export interface AuthFetchUserData {
    type: typeof FETCH_USER_DATA;
}

export type AuthActionTypes = AuthLoginAction | AuthRegisterAction | AuthSignOutAction | AuthFetchUserData;
