import { IAuthAction, MainSearchActionTypes } from "./main_search_actions";
import { Reducer } from "redux";
import IMainSearchState from "./main_search_state";

const initialState = {
  isFetching: false,
  searchResults: []
} as IMainSearchState;

export const AuthReducer: Reducer<IMainSearchState, IAuthAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case MainSearchActionTypes.LOGIN_START:
    case MainSearchActionTypes.REGISTER_START: {
      return {
        ...state
      };
    }
    case MainSearchActionTypes.REGISTER_SUCCESS: {
      return {
        ...state
      };
    }
    case MainSearchActionTypes.SIGN_OUT_START: {
      return {
        ...state
      };
    }
    case MainSearchActionTypes.FETCH_USER_DATA_START: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};
