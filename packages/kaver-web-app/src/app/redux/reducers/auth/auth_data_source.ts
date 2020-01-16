import ApiClient from "../../../services/api_client";
import gql from "graphql-tag";
import { LoginVariables, Login } from "../../../models/generated/Login";
import { RegisterVariables, Register } from "../../../models/generated/Register";

const LOGIN_QUERY = gql`
  query Login($username: String!, $password: String!){
    login(username: $username, password: $password) {
      firstname
      lastname
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!, $lastname: String!, $firstname: String!){
    register(username: $username, password: $password, lastname: $lastname, firstname: $firstname) {
      firstname
      lastname
    }
  }
`;

const SIGN_OUT_QUERY = gql`
  mutation SignOut {
    invalidateTokens
  }
`;

const FETCH_USER_DATA_QUERY = gql`
  query Me {
    me {
      firstname
      lastname
    }
  }
`;

export default class AuthDataSource {
  public static async login(username: string, password: string) {
    const result = await ApiClient.getInstance().query<Login, LoginVariables>({
      query: LOGIN_QUERY,
      variables: {
        username,
        password
      },
    });

    return result?.data?.login;
  }

  public static async register(username: string, password: string, firstname: string, lastname: string) {
    const result = await ApiClient.getInstance().mutate<Register, RegisterVariables>({
      mutation: REGISTER_MUTATION,
      variables: {
        username,
        password,
        firstname,
        lastname
      },
    });

    return result?.data?.register;
  }

  public static async signOut() {
    await ApiClient.getInstance().mutate({
      mutation: SIGN_OUT_QUERY,
    });
  }

  public static async fetch_user_data() {
    const result = await ApiClient.getInstance().query({
      query: FETCH_USER_DATA_QUERY,
    });

    return result?.data?.me;
  }
}
