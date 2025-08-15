import type { Advert } from "../pages/adverts/types";
import type { Actions } from "./actions";

export type State = {
  auth: boolean;
  adverts: {
    loaded: boolean;
    data: Advert[];
  };
  ui: {
    pending: boolean;
    error: Error | null;
  };
};

export const defaultState: State = {
  auth: false,
  adverts: {
    loaded: false,
    data: [],
  },
  ui: {
    pending: false,
    error: null,
  },
};

export function authReducer(
  state = defaultState.auth,
  action: Actions,
): State["auth"] {
  switch (action.type) {
    case "auth/login/fulfilled":
      return true;
    case "auth/logout":
      return false;
    default:
      return state;
  }
}

export function advertsReducers(
  state = defaultState.adverts,
  action: any,
): State["adverts"] {
  return state;
}

export function uiReducer(state = defaultState.ui, action: Actions): State["ui"] {
  switch (action.type) {
    case "auth/login/pending":
      return { pending: true, error: null };

    case "auth/login/fulfilled":
      return { pending: false, error: null };

    case "auth/login/rejected":
      return { pending: false, error: action.payload };

    case "ui/reset-error":
      return { ...state, error: null };

    default:
      return state;
  }
}
