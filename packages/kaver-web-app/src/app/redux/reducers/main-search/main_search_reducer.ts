import { MainSearchActionTypes, IMainSearchAction } from "./main_search_actions";
import { Reducer } from "redux";
import IMainSearchState from "./main_search_state";
import { MainSearch } from "../../../models/generated/MainSearch";

const initialState = {
  isSongsFetching: false,
  isSingersFetching: false,
} as IMainSearchState;

export const MainSearchReducer: Reducer<IMainSearchState, IMainSearchAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case MainSearchActionTypes.SONGS_START: {
      const newState = { ...state };
      newState.isSongsFetching = true;
      return newState;
    }
    case MainSearchActionTypes.SONGS_SUCCESS: {
      const newState = { ...state };
      newState.isSongsFetching = false;
      if (newState.searchResults == null) {
        newState.searchResults = {
          searchSingerByNameSubstring: [],
          searchSongByTitleSubstring: action.data
        } as MainSearch;
      } else {
        newState.searchResults.searchSongByTitleSubstring = action.data;
      }
      return newState;
    }
    case MainSearchActionTypes.SONGS_FAILURE: {
      const newState = { ...state };
      newState.isSongsFetching = false;
      return newState;
    }
    case MainSearchActionTypes.SINGERS_START: {
      const newState = { ...state };
      newState.isSingersFetching = true;
      return newState;
    }
    case MainSearchActionTypes.SINGERS_SUCCESS: {
      const newState = { ...state };
      newState.isSingersFetching = false;
      if (newState.searchResults == null) {
        newState.searchResults = {
          searchSingerByNameSubstring: action.data,
          searchSongByTitleSubstring: []
        } as MainSearch;
      } else {
        newState.searchResults.searchSingerByNameSubstring = action.data;
      }
      if (newState.searchResults != null) {
        newState.searchResults.searchSingerByNameSubstring = action.data;
      }
      return newState;
    }
    case MainSearchActionTypes.SINGERS_FAILURE: {
      const newState = { ...state };
      newState.isSingersFetching = false;
      return newState;
    }
    case MainSearchActionTypes.CLEAR_DATA: {
      return initialState;
    }
    default:
      return state;
  }
};
