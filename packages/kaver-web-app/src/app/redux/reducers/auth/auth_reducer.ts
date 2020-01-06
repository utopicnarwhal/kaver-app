import { LOGIN, REGISTER, SIGN_OUT, FETCH_USER_DATA, AuthActionTypes } from "./auth_actions";

const initialState = {
  allIds: [],
  byIds: {}
};

export default (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state
      };
    }
    case REGISTER: {
      return {
        ...state
      };
    }
    case SIGN_OUT: {
      return {
        ...state
      };
    }
    case FETCH_USER_DATA: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};
