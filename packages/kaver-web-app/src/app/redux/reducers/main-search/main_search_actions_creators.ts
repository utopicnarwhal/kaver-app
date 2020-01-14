// Import redux types
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

// Business domain imports
import {
  MainSearchActionTypes,
  IMainSearchAction,
  IMainSearchStartAction,
  IMainSearchSuccessAction,
  IMainSearchFailureAction
} from "./main_search_actions";
import IMainSearchState from "./main_search_state";
import MainSearchDataSource from "./main_search_data_source";

export const mainSearchStart = (): IMainSearchStartAction => {
  return {
    type: MainSearchActionTypes.SEARCH_START
  };
};

export const mainSearchSuccess = (): IMainSearchSuccessAction => {
  return {
    type: MainSearchActionTypes.SEARCH_SUCCESS
  };
};

export const mainSearchFailure = (message: string): IMainSearchFailureAction => {
  return {
    type: MainSearchActionTypes.SEARCH_FAILURE,
    message
  };
};

// <Promise<Return Type>, State Interface, Type of Param, Type of Action>
export const mainSearch: ActionCreator<ThunkAction<
  Promise<any>,
  IMainSearchState,
  null,
  IMainSearchAction
>> = (username: string, password) => {
  return async (dispatch: Dispatch) => {
    dispatch(mainSearchStart());

    return MainSearchDataSource.login(username, password)
      .then((response) => {
        console.log(response);
        dispatch(mainSearchSuccess());
      })
      .catch((error) => {
        console.log(error);
        dispatch(mainSearchFailure(error?.toString()));
      });
  };
};
