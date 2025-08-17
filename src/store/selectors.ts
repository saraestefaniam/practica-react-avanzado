import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth

export function getAdvertSelector(advertId?: string) {
    return function (state: RootState) {
        return state.adverts.data?.find((advert) => advert.id === String(advertId))
    }
}

export const getAdvertsSelector = (state: RootState) => state.adverts.data

export const getUi = (state: RootState) => state.ui