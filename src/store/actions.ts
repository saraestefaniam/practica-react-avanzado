import type { AppThunk } from "."
import type { Advert } from "../pages/adverts/types"

//types
type AuthLoginPending = {
    type: "auth/login/pending"
}

type AuthLoginFulfilled = {
    type: "auth/login/fulfilled"
}

type AuthLoginRejected = {
    type: "auth/login/rejected"
    payload: Error;
}

type AuthLogout = {
    type: "auth/logout"
}

type UiResetError = {
    type: "ui/reset-error"
}

type AdvertsLoadedFulfilled = {
    type: "adverts/loaded/fulfilled";
    payload: Advert[]
}

type AdvertsLoadedPending = {
    type: "adverts/loaded/pending"
}

type AdvertsLoadedRejected = {
    type: "adverts/loaded/rejected";
    payload: Error;
}

//actions creators
export const authLoginFulfilled = (): AuthLoginFulfilled => ({
    type: "auth/login/fulfilled"
})

export const authLoginPending = (): AuthLoginPending => ({
    type: "auth/login/pending",
})

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
    type: "auth/login/rejected",
    payload: error
})

export const uiResetError = (): UiResetError => ({
    type: "ui/reset-error"
})

export const advertsLoadedFulfilled = (advert: Advert[]): AdvertsLoadedFulfilled => ({
    type: "adverts/loaded/fulfilled",
    payload: advert
})

export const advertsLoadedPending = (): AdvertsLoadedPending => ({
    type: "adverts/loaded/pending",
})

export const advertsLoadedRejected = (error: Error): AdvertsLoadedRejected => ({
    type: "adverts/loaded/rejected",
    payload: error
})

//thunks
export function authLogin(credentials: {email: string; password: string}): AppThunk {
    return async function(dispatch, _getState, { api }) {
        dispatch(authLoginPending())
        try {
            await api.auth.login(credentials)
            dispatch(authLoginFulfilled())
        } catch (error) {
            dispatch(authLoginRejected(error as Error))
        }
    }
}

export function authLogout(): AppThunk<Promise<void>> {
    return async function(dispatch, _getstate, { api }) {
        await api.auth.logout()
        dispatch({type: "auth/logout"})
    }
}

export function advertsLoaded(): AppThunk<Promise<void>> {
    return async function (dispatch, getState, { api }) {
        const state = getState()
        if (state.adverts.loaded) {
            return;
        }
        try {
            dispatch(advertsLoadedPending())
            const adverts = await api.adverts.getAdverts()
            dispatch(advertsLoadedFulfilled(adverts.data))
        } catch (error) {
            if (error instanceof Error) {
                dispatch(advertsLoadedRejected(error))
            }
        }
    }
}

export type Actions = 
| AuthLoginFulfilled
| AuthLoginPending
| AuthLoginRejected
| AuthLogout
| UiResetError
| AdvertsLoadedFulfilled
| AdvertsLoadedPending
| AdvertsLoadedRejected