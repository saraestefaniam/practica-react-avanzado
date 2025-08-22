import { advertsReducers, authReducer } from "../reducer"

describe("authReducer", () => {
    test('should manage "auth/login/fulfilled" action', () => {
        const result = authReducer(undefined, {type: "auth/login/fulfilled"})
        expect(result).toBe(true)
    })

    test('should manage "auth/logout" action', () => {
        const result = authReducer(undefined, {type: "auth/logout"})
        expect(result).toBe(false)
    })
})

describe("advertsReducer", () => {
    test('should manage "adverts/loaded/fulfilled" action', () => {
        const result = advertsReducers(undefined, {type: "adverts/loaded/fulfilled", payload: []})
        expect(result).toEqual({loaded: true, data: []})
    })

    test('should manage "adverts/created/fulfilled" action', () => {
        const fakeAdvert = {id: "1", name: "", price: 0, sale: false, tags: []}
        const result = advertsReducers(undefined, {type: "adverts/created/fulfilled", payload: fakeAdvert})
        expect(result).toEqual({loaded: false, data: [fakeAdvert]})
    })

    test('should manage "adverts/detail/fulfilled" action', () => {
        const fakeAdvert = {id: "1", name: "", price: 0, sale: false, tags: []}
        const result = advertsReducers(undefined, {type: "adverts/detail/fulfilled", payload: fakeAdvert})
        expect(result).toEqual({loaded: false, data: [fakeAdvert]})
    })

    test('should manage "adverts/deleted/fulfilled" action', () => {
        const result = advertsReducers(undefined, {type: "adverts/deleted/fulfilled", payload: ""})
        expect(result).toEqual({loaded: false, data: []})
    })
})