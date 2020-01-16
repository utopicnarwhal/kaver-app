/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register {
  __typename: "User";
  firstname: string;
  lastname: string;
}

export interface Register {
  register: Register_register | null;
}

export interface RegisterVariables {
  username: string;
  password: string;
  lastname: string;
  firstname: string;
}
