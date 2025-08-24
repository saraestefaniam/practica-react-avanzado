import { advertsCreatedFulfilled, advertsCreatedPending, advertsCreatedRejected, advertsDeletedFulfilled, advertsDeletedPending, advertsDeletedRejected, advertsDetailFulfilled, advertsDetailPending, advertsDetailRejected, advertsLoaded, advertsLoadedFulfilled, advertsLoadedPending, advertsLoadedRejected, advertsTagsFulfilled, advertsTagsPending, advertsTagsRejected, authLogin, authLoginFulfilled, authLoginPending, authLoginRejected, authLogout, uiResetError } from "../actions";
import { defaultState } from "../reducer";

test('should return and "auth/login/pending" action', () => {
    const expected = {type: "auth/login/pending"};
    const result = authLoginPending()
    expect(result).toEqual(expected)
} )

test('sould return and "auth/login/rejected" action with an Error', () => {
    const error = new Error('Something went wrong')
    const expected = {type: "auth/login/rejected", payload: error}
    const result = authLoginRejected(error)
    expect(result).toEqual(expected)
})

test('should return and "auth/login/fulfilled" action', () => {
    const expected = {type: "auth/login/fulfilled"}
    const result = authLoginFulfilled()
    expect(result).toEqual(expected)
})

test('should return and "adverts/loaded/fulfilled" action with empty adverts', () => {
    const expected = {type: "adverts/loaded/fulfilled", payload: []}
    const result = advertsLoadedFulfilled([])
    expect(result).toEqual(expected)
})

test('should return and "adverts/loaded/pending" action', () => {
    const expected = {type: "adverts/loaded/pending"}
    const result = advertsLoadedPending()
    expect(result).toEqual(expected)
} )

test('should return and "adverts/loaded/rejected" action with an Error', () => {
    const error = new Error('Something went wrong')
    const expected = {type: "adverts/loaded/rejected", payload: error}
    const result = advertsLoadedRejected(error)
    expect(result).toEqual(expected)
})

test('should return and "adverts/created/fulfilled" action with empty adverts', () => {
    const fakeAdvert = {id: "1", name: "", price: 0, sale: false, tags: []}
    const expected = {type: "adverts/created/fulfilled", payload: fakeAdvert}
    const result = advertsCreatedFulfilled(fakeAdvert)
    expect(result).toEqual(expected)
})

test('should return and "adverts/created/pending action', () => {
    const expected = {type: "adverts/created/pending"}
    const result = advertsCreatedPending()
    expect(result).toEqual(expected)
})

test('should return and "adverts/created/rejected" action with an Error', () => {
    const error = new Error('Something went wrong')
    const expected = {type: "adverts/created/rejected", payload: error}
    const result = advertsCreatedRejected(error)
    expect(result).toEqual(expected)
})

test('should return and "adverts/detail/fulfilled" action with an advert', () => {
    const fakeAdvert = {id: "1", name: "", price: 0, sale: false, tags:[]}
    const expected = {type: "adverts/detail/fulfilled", payload: fakeAdvert}
    const result = advertsDetailFulfilled(fakeAdvert)
    expect(result).toEqual(expected)
})

test('should return and "adverts/detail/pending" action', () => {
    const expected = {type: "adverts/detail/pending"}
    const result = advertsDetailPending()
    expect(result).toEqual(expected)
})

test('should return and "adverts/detail/rejected" action', () => {
    const error = new Error('Something went wrong')
    const expected = {type: "adverts/detail/rejected", payload: error}
    const result = advertsDetailRejected(error)
    expect(result).toEqual(expected)
})

test('should return and "adverts/tags/fulfilled" with empty tags', () => {
    const expected = {type: "adverts/tags/fulfilled", payload: []}
    const result = advertsTagsFulfilled([])
    expect(result).toEqual(expected)
})

test('should return and "adverts/tags/pending" action', () => {
    const expected = {type: "adverts/tags/pending"}
    const result = advertsTagsPending()
    expect(result).toEqual(expected)
})

test('should return and "adverts/tags/rejected" action with an Error', () => {
    const error = new Error('Something went wrong')
    const expected = {type: "adverts/tags/rejected", payload: error}
    const result = advertsTagsRejected(error)
    expect(result).toEqual(expected)
})

test('should return "adverts/deleted/fulfilled" action with an empty advert', () => {
    const expected = {type: "adverts/deleted/fulfilled", payload: ""}
    const result = advertsDeletedFulfilled("")
    expect(result).toEqual(expected)
})

test('should return and "adverts/deleted/pending" action', () => {
    const expected = {type: "adverts/deleted/pending"}
    const result = advertsDeletedPending()
    expect(result).toEqual(expected)
})

test('should return and "adverts/deleted/rejected" action with and Error', () => {
    const error = new Error('Something went wrong')
    const expected = {type: "adverts/deleted/rejected", payload: error}
    const result = advertsDeletedRejected(error)
    expect(result).toEqual(expected)
})

test('should return and "ui/reset-error" action', () => {
    const expected = {type: "ui/reset-error"}
    const result = uiResetError()
    expect(result).toEqual(expected)
})

//test thunks
describe('authLogin', () => {
    afterEach(() => {
        dispatchMock.mockClear()
    })
    const credentials = {email: "Sara@email.com", password: "1234"}
    const thunk = authLogin(credentials)
    const dispatchMock = vi.fn()
    const api = {
        auth: {
            login: vi.fn()
        }
    }

    test('when login resolves', async () => {
        api.auth.login = vi.fn().mockResolvedValue(undefined)
        //@ts-expect-error: no need getState
        await thunk(dispatchMock, undefined, {api})

        expect(dispatchMock).toHaveBeenCalledTimes(2)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, { type: "auth/login/pending"})
        expect(dispatchMock).toHaveBeenNthCalledWith(2, { type: "auth/login/fulfilled"})
        expect(api.auth.login).toHaveBeenCalledWith(credentials)
    })

    test('when login rejects', async () => {
        const error = new Error('Unauthorized')
        api.auth.login = vi.fn().mockRejectedValue(error)
        //@ts-expect-error: no need getState
        await thunk(dispatchMock, undefined, {api})

        expect(dispatchMock).toHaveBeenCalledTimes(2)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, {type: "auth/login/pending"})
        expect(dispatchMock).toHaveBeenNthCalledWith(2, {type: "auth/login/rejected", payload: error})
    })
})

describe('authLogout', () => {
    const thunk = authLogout()
    const dispatchMock = vi.fn()
    const api = {
        auth: {
            logout: vi.fn()
        }
    }

    test('when logout resolves', async () => {
        api.auth.logout = vi.fn().mockResolvedValue(undefined)
        //@ts-expect-error: no need getState
        await thunk(dispatchMock, undefined, {api})

        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, {type: "auth/logout"})
    })
})

describe('advertsLoaded', () => {
    afterEach(() => {
        dispatchMock.mockClear()
    })
    const dispatchMock = vi.fn()
    const thunk = advertsLoaded()
    const api = {
        adverts: {
            getAdverts: vi.fn()
        }
    } as any
    const getStateMock = vi.fn(() => ({
        ...defaultState,
        adverts: {loaded: false, data: []}
    }))

    test('when advertsLoaded resolves', async () => {
        api.adverts.getAdverts = vi.fn().mockResolvedValue({data: []})
        await thunk(dispatchMock, getStateMock, {api})

        expect(dispatchMock).toHaveBeenCalledTimes(2)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, {type: "adverts/loaded/pending"})
        expect(dispatchMock).toHaveBeenNthCalledWith(2, {type: "adverts/loaded/fulfilled", payload: []})
    })

    test('when advertsLoaded rejects', async () => {
        const error = new Error('unauthorized')
        api.adverts.getAdverts = vi.fn().mockRejectedValue(error)
        await thunk(dispatchMock, getStateMock, {api})

        expect(dispatchMock).toHaveBeenCalledTimes(2)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, {type: "adverts/loaded/pending"})
        expect(dispatchMock).toHaveBeenNthCalledWith(2, {type: "adverts/loaded/rejected", payload: error})
    })
})