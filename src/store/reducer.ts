import type { Advert } from "../pages/adverts/types"
import type { Actions } from "./actions"

export type State = {
    auth: boolean,
    adverts: {
        loaded: boolean,
        data: Advert[]
    }
}

export const defaultState: State = {
    auth: false,
    adverts: {
        loaded: false,
        data: []
    }
}

export function authReducer(state = defaultState.auth, action: Actions): State["auth"] {
    switch (action.type) {
        case "auth/login/fulfilled":
            return true
        default:
            return state;
    }
}

export function advertsReducers(state = defaultState.adverts, action: any): State["adverts"] {
    return state;
}