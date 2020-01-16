// Import redux types
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

// Business domain imports
import {
  MainSearchActionTypes,
  IMainSearchAction,
  IMainSearchSongsStartAction,
  IMainSearchSongsFailureAction,
  IMainSearchSongsSuccessAction,
  IMainSearchSingersStartAction,
  IMainSearchSingersSuccessAction,
  IMainSearchSingersFailureAction,
  IMainSearchClearDataAction,
} from "./main_search_actions";
import IMainSearchState from "./main_search_state";
import MainSearchDataSource from "./main_search_data_source";
import { MainSearch_searchSingerByTitleSubstring, MainSearch_searchSongByTitleSubstring } from "../../../models/generated/MainSearch";

export const mainSearchSongsStart = (): IMainSearchSongsStartAction => {
  return {
    type: MainSearchActionTypes.SONGS_START
  };
};

export const mainSearchSongsSuccess = (songData: MainSearch_searchSongByTitleSubstring[] | null): IMainSearchSongsSuccessAction => {
  return {
    type: MainSearchActionTypes.SONGS_SUCCESS,
    data: songData
  };
};

export const mainSearchSongsFailure = (message: string): IMainSearchSongsFailureAction => {
  return {
    type: MainSearchActionTypes.SONGS_FAILURE,
    message
  };
};

export const mainSearchSingersStart = (): IMainSearchSingersStartAction => {
  return {
    type: MainSearchActionTypes.SINGERS_START
  };
};

export const mainSearchSingersSuccess = (singersData: MainSearch_searchSingerByTitleSubstring[] | null): IMainSearchSingersSuccessAction => {
  return {
    type: MainSearchActionTypes.SINGERS_SUCCESS,
    data: singersData
  };
};

export const mainSearchSingersFailure = (message: string): IMainSearchSingersFailureAction => {
  return {
    type: MainSearchActionTypes.SINGERS_FAILURE,
    message
  };
};

export const mainSearchClearData = (): IMainSearchClearDataAction => {
  return {
    type: MainSearchActionTypes.CLEAR_DATA
  };
};

// <Promise<Return Type>, State Interface, Type of Param, Type of Action>
export const mainSearch: ActionCreator<ThunkAction<
  Promise<any>,
  IMainSearchState,
  null,
  IMainSearchAction
>> = (searchString: string) => {
  return async (dispatch: Dispatch) => {
    if (searchString === "") {
      dispatch(mainSearchClearData());
      return;
    }
    dispatch(mainSearchSongsStart());
    dispatch(mainSearchSingersStart());

    console.log(searchString);
    return MainSearchDataSource.mainSearch(searchString)
      .then((response) => {
        console.log(response);
        dispatch(mainSearchSongsSuccess(response.data.searchSongByTitleSubstring));
        dispatch(mainSearchSingersSuccess(response.data.searchSingerByTitleSubstring));
      })
      .catch((error) => {
        console.log(error);
        dispatch(mainSearchSongsFailure(error?.toString()));
      });
  };
};
