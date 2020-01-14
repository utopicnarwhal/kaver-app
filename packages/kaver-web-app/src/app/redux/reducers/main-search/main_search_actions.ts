export enum MainSearchActionTypes {
  SEARCH_START = "SEARCH_START",
  SEARCH_SUCCESS = "SEARCH_SUCCESS",
  SEARCH_FAILURE = "SEARCH_FAILURE",

  UPLOAD_MORE_SONGS_START = "UPLOAD_MORE_START",
  UPLOAD_MORE_SONGS_SUCCESS = "UPLOAD_MORE_SUCCESS",
  UPLOAD_MORE_SONGS_FAILURE = "UPLOAD_MORE_FAILURE",

  UPLOAD_MORE_SINGERS_START = "UPLOAD_MORE_SINGERS_START",
  UPLOAD_MORE_SINGERS_SUCCESS = "UPLOAD_MORE_SINGERS_SUCCESS",
  UPLOAD_MORE_SINGERS_FAILURE = "UPLOAD_MORE_SINGERS_FAILURE",

  CLEAR_DATA = "CLEAR_DATA",
}

export interface IMainSearchStartAction {
  type: typeof MainSearchActionTypes.SEARCH_START;
}

export interface IMainSearchSuccessAction {
  type: typeof MainSearchActionTypes.SEARCH_SUCCESS;
}

export interface IMainSearchFailureAction {
  type: typeof MainSearchActionTypes.SEARCH_FAILURE;
  message: string;
}

export interface IMainSearchUploadMoreSongsStartAction {
  type: typeof MainSearchActionTypes.UPLOAD_MORE_SONGS_START;
}

export interface IMainSearchUploadMoreSongsSuccessAction {
  type: typeof MainSearchActionTypes.UPLOAD_MORE_SONGS_SUCCESS;
}

export interface IMainSearchUploadMoreSongsFailureAction {
  type: typeof MainSearchActionTypes.UPLOAD_MORE_SONGS_FAILURE;
  message: string;
}

export interface IMainSearchUploadMoreSingersStartAction {
  type: typeof MainSearchActionTypes.UPLOAD_MORE_SINGERS_START;
}

export interface IMainSearchUploadMoreSingersSuccessAction {
  type: typeof MainSearchActionTypes.UPLOAD_MORE_SINGERS_SUCCESS;
}

export interface IMainSearchUploadMoreSingersFailureAction {
  type: typeof MainSearchActionTypes.UPLOAD_MORE_SINGERS_FAILURE;
  message: string;
}

export interface IMainSearchClearDataAction {
  type: typeof MainSearchActionTypes.CLEAR_DATA;
}

export type IMainSearchAction =
  | IMainSearchStartAction
  | IMainSearchSuccessAction
  | IMainSearchFailureAction
  | IMainSearchUploadMoreSongsStartAction
  | IMainSearchUploadMoreSongsSuccessAction
  | IMainSearchUploadMoreSongsFailureAction
  | IMainSearchUploadMoreSingersStartAction
  | IMainSearchUploadMoreSingersSuccessAction
  | IMainSearchUploadMoreSingersFailureAction
  | IMainSearchClearDataAction;
