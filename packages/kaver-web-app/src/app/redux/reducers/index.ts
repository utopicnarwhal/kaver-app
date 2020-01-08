import { combineReducers } from "redux";
import { AuthReducer } from "./auth/auth_reducer";
import { IAppState } from "../store";

export default combineReducers<IAppState>({ authState: AuthReducer });
