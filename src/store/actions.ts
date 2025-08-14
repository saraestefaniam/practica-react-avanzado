import type { AppThunk } from "."

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

//thunks
export function authLogin(credentials: {username: string; password: string}): AppThunk {
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

export type Actions = 
| AuthLoginFulfilled
| AuthLoginPending
| AuthLoginRejected
| AuthLogout
| UiResetError