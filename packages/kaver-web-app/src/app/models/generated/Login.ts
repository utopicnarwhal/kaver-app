/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Login
// ====================================================

export interface Login_login {
  __typename: "User";
  firstname: string;
  lastname: string;
}

export interface Login {
  login: Login_login | null;
}

export interface LoginVariables {
  username: string;
  password: string;
}
