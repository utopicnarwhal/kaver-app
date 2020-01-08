import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import IAuthState from "./reducers/auth/auth_state";
import { composeWithDevTools } from "redux-devtools-extension";
import { IAuthAction } from "./reducers/auth/auth_actions";

export interface IAppState {
    authState: IAuthState;
}

export type IAppAction = IAuthAction;

export default function configureStore(): Store<IAppState, IAppAction> {
  const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
}
