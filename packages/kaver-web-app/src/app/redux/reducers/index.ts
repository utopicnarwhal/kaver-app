import { combineReducers } from "redux";
import { AuthReducer } from "./auth/auth_reducer";
import { IAppState } from "../store";
import { MainSearchReducer } from "./main-search/main_search_reducer";

export default combineReducers<IAppState>({ authState: AuthReducer, mainSearchState: MainSearchReducer });
