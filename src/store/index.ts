import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { authReducer, advertsReducers } from "./reducer";
import type { State } from "./reducer";

export type RootState = State;

const rootReducer = combineReducers({
  auth: authReducer,
  adverts: advertsReducers,
});

export default function configureStore(preloadedState?: Partial<RootState>) {
  const store = createStore(
    rootReducer,
    preloadedState,
    // // @ts-expect-error: import devtools extension
    // window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //  // @ts-expect-error: import devtools extension
    //  window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeWithDevTools(applyMiddleware(thunk)),
  );

  return store;
}

export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore["dispatch"];
