import type { Advert } from "../pages/adverts/types"

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

export function authReducer(state = defaultState.auth, action: any): State["auth"] {
    return state;
}

export function advertsReducers(state = defaultState.adverts, action: any): State["adverts"] {
    return state;
}