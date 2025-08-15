import { createStore, combineReducers, applyMiddleware } from "redux";
import * as thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { authReducer, advertsReducers } from "./reducer";
import type { State } from "./reducer";
import * as auth from "../pages/auth/service";
import * as adverts from "../pages/adverts/advert-service";
import type { Actions } from "./actions";
import { useDispatch, useSelector } from "react-redux";


const rootReducer = combineReducers({
  auth: authReducer,
  adverts: advertsReducers,
});

type TheExtraArgument = { api: { auth: typeof auth; adverts: typeof adverts } };

// @ts-expect-error: any
// slint-disable-next-line @typescript-slint/no-unused-vars
const timestamp = (store) => (next) => (action) => {
  const nextAction = {
    ...action,
    meta: {
      ...action.meta,
      timestamp: new Date(),
    },
  };
  return next(nextAction);
};

export default function configureStore(preloadedState?: Partial<State>) {
  const store = createStore(
    rootReducer,
    preloadedState as never,
    // // @ts-expect-error: import devtools extension
    // window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //  // @ts-expect-error: import devtools extension
    //  window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeWithDevTools(
      applyMiddleware(
        thunk.withExtraArgument<State, Actions, TheExtraArgument>({
          api: { auth, adverts },
        }),
        timestamp,
      ),
    ),
  );

  return store;
}

export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"]
export type RootState = ReturnType<AppGetState>
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  TheExtraArgument,
  Actions
>;
