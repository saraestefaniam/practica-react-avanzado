import type { Advert } from "../pages/adverts/types";
import type { Actions } from "./actions";

export type State = {
  auth: boolean;
  adverts: {
    loaded: boolean;
    data: Advert[];
  };
  tags: {
    loaded: boolean;
    data: string[];
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
  tags: {
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
  action: Actions,
): State["adverts"] {
  switch (action.type) {
    case "adverts/loaded/fulfilled":
      return { loaded: true, data: action.payload };
    case "adverts/detail/fulfilled":
      return { loaded: false, data: [action.payload] };
  }
  return state;
}

export function uiReducer(
  state = defaultState.ui,
  action: Actions,
): State["ui"] {
  switch (action.type) {
    case "auth/login/pending":
    case "adverts/loaded/pending":
    case "adverts/detail/pending":
    case "adverts/tags/pending":
      return { pending: true, error: null };

    case "auth/login/fulfilled":
    case "adverts/loaded/fulfilled":
    case "adverts/detail/fulfilled":
    case "adverts/tags/fulfilled":
      return { pending: false, error: null };

    case "auth/login/rejected":
    case "adverts/loaded/rejected":
    case "adverts/detail/rejected":
    case "adverts/tags/rejected":
      return { pending: false, error: action.payload };

    case "ui/reset-error":
      return { ...state, error: null };

    default:
      return state;
  }
}

export function tagsReducer(state = defaultState.tags, action: Actions): State["tags"] {
  switch(action.type) {
    case "adverts/tags/fulfilled":
      return { loaded: true, data: action.payload}
  }
  return state;
}
