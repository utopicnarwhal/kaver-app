import { MainSearch_searchSongByTitleSubstring, MainSearch_searchSingerByNameSubstring } from "../../../models/generated/MainSearch";

export enum MainSearchActionTypes {
  SONGS_START = "START",
  SONGS_SUCCESS = "SUCCESS",
  SONGS_FAILURE = "FAILURE",

  SINGERS_START = "SINGERS_START",
  SINGERS_SUCCESS = "SINGERS_SUCCESS",
  SINGERS_FAILURE = "SINGERS_FAILURE",

  CLEAR_DATA = "CLEAR_DATA",
}

export interface IMainSearchSongsStartAction {
  type: typeof MainSearchActionTypes.SONGS_START;
}

export interface IMainSearchSongsSuccessAction {
  type: typeof MainSearchActionTypes.SONGS_SUCCESS;
  data: MainSearch_searchSongByTitleSubstring[] | null;
}

export interface IMainSearchSongsFailureAction {
  type: typeof MainSearchActionTypes.SONGS_FAILURE;
  message: string;
}

export interface IMainSearchSingersStartAction {
  type: typeof MainSearchActionTypes.SINGERS_START;
}

export interface IMainSearchSingersSuccessAction {
  type: typeof MainSearchActionTypes.SINGERS_SUCCESS;
  data: MainSearch_searchSingerByNameSubstring[] | null;
}

export interface IMainSearchSingersFailureAction {
  type: typeof MainSearchActionTypes.SINGERS_FAILURE;
  message: string;
}

export interface IMainSearchClearDataAction {
  type: typeof MainSearchActionTypes.CLEAR_DATA;
}

export type IMainSearchAction =
  | IMainSearchSongsStartAction
  | IMainSearchSongsSuccessAction
  | IMainSearchSongsFailureAction
  | IMainSearchSingersStartAction
  | IMainSearchSingersSuccessAction
  | IMainSearchSingersFailureAction
  | IMainSearchClearDataAction;
