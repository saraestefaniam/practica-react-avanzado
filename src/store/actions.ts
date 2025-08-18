import type { AppThunk } from "."
import type { Advert } from "../pages/adverts/types"
import { getAdvertSelector } from './selectors';

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

type AdvertsDetailFulfilled = {
    type: "adverts/detail/fulfilled";
    payload: Advert
}

type AdvertsDetailPending = {
    type: "adverts/detail/pending";
}

type AdvertsDetailRejected = {
    type: "adverts/detail/rejected";
    payload: Error;
}

type AdvertsTagsFulfilled = {
    type: "adverts/tags/fulfilled"
    payload: string[]
}

type AdvertsTagsPending = {
    type: "adverts/tags/pending"
}

type AdvertsTagsRejected = {
    type: "adverts/tags/rejected";
    payload: Error;
}

type AdvertsCreatedFulfilled = {
    type: "adverts/created/fulfilled";
    payload: Advert
}

type AdvertsCreatedPending = {
    type: "adverts/created/pending"
}

type AdvertsCreatedRejected = {
    type: "adverts/created/rejected"
    payload: Error
}

type AdvertsDeletedFulfilled = {
    type: "adverts/deleted/fulfilled"
    payload: string
}

type AdvertsDeletedPending = {
    type: "adverts/deleted/pending"
}

type AdvertsDeletedRejected = {
    type: "adverts/deleted/rejected"
    payload: Error
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

export const advertsDetailFulfilled = (advert: Advert): AdvertsDetailFulfilled => ({
    type: "adverts/detail/fulfilled",
    payload: advert
})

export const advertsDetailPending = (): AdvertsDetailPending => ({
    type: "adverts/detail/pending"
})

export const advertsDetailRejected = (error: Error): AdvertsDetailRejected => ({
    type: "adverts/detail/rejected",
    payload: error
})

export const advertsTagsFulfilled = (tag: string[]): AdvertsTagsFulfilled => ({
    type: "adverts/tags/fulfilled",
    payload: tag
})

export const advertsTagsPending = (): AdvertsTagsPending => ({
    type: "adverts/tags/pending"
})

export const advertsTagsRejected = (error: Error): AdvertsTagsRejected => ({
    type: "adverts/tags/rejected",
    payload: error
})

export const advertsCreatedFulfilled = (advert: Advert): AdvertsCreatedFulfilled => ({
    type: "adverts/created/fulfilled",
    payload: advert
})

export const advertsCreatedPending = (): AdvertsCreatedPending => ({
    type: "adverts/created/pending"
})

export const advertsCreatedRejected = (error: Error): AdvertsCreatedRejected => ({
    type: "adverts/created/rejected",
    payload: error
})

export const advertsDeletedFulfilled = (advert: string): AdvertsDeletedFulfilled => ({
    type: "adverts/deleted/fulfilled",
    payload: advert
})

export const advertsDeletedPending = (): AdvertsDeletedPending => ({
    type: "adverts/deleted/pending"
})

export const advertsDeletedRejected = (error: Error): AdvertsDeletedRejected => ({
    type: "adverts/deleted/rejected",
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
            throw error;
        }
    }
}

export function advertsDetail(advertId: string): AppThunk<Promise<void>> {
    return async function (dispatch, getState, { api }) {
        const state = getState()
        if (getAdvertSelector(advertId)(state)) {
            return
        }
        try {
            dispatch(advertsDetailPending())
            const advert = await api.adverts.getAdvertById(advertId)
            dispatch(advertsDetailFulfilled(advert.data))
        } catch (error) {
            if (error instanceof Error) {
                dispatch(advertsDetailRejected(error))
            }
            throw error;
        }
    }
}

export function tags(): AppThunk<Promise<void>> {
    return async function(dispatch, getState, { api }) {
        const state = getState()
        if (state.tags.loaded){
            return;
        }
        try {
            dispatch(advertsTagsPending())
            const tags = await api.adverts.getAdvertsTags()
            dispatch(advertsTagsFulfilled(tags.data))
        } catch (error) {
            if (error instanceof Error)
            dispatch(advertsTagsRejected(error))
        } 
    }
}

export function advertsCreate(advertContent: FormData): AppThunk<Promise<Advert>> {
    return async function (dispatch, _getState, {api}) {
        try {
            dispatch(advertsCreatedPending())
            const createdAdvert = await api.adverts.createAdvert(advertContent)
            //const advert = await api.adverts.getAdvertById(createdAdvert.data)
            dispatch(advertsCreatedFulfilled(createdAdvert.data))
            return createdAdvert.data
        } catch (error) {
            if (error instanceof Error) {
                dispatch(advertsCreatedRejected(error))
            }
            throw error;
        }
    }
}

export function advertsDelete(advertToDelete: string): AppThunk<Promise<void>> {
    return async function (dispatch, _getState, {api}) {
        try {
            dispatch(advertsDeletedPending())
            await api.adverts.deleteAdvert(advertToDelete)
            dispatch(advertsDeletedFulfilled(advertToDelete))
        } catch (error) {
            if (error instanceof Error) {
                dispatch(advertsDeletedRejected(error))
            }
            throw error;
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
| AdvertsDetailFulfilled
| AdvertsDetailPending
| AdvertsDetailRejected
| AdvertsTagsFulfilled
| AdvertsTagsPending
| AdvertsTagsRejected
| AdvertsCreatedFulfilled
| AdvertsCreatedPending
| AdvertsCreatedRejected
| AdvertsDeletedFulfilled
| AdvertsDeletedPending
| AdvertsDeletedRejected