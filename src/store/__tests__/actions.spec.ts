import { test, expect } from "vitest"
import { advertsLoadedFulfilled, advertsLoadedPending, advertsLoadedRejected, authLoginFulfilled, authLoginPending, authLoginRejected } from "../actions";

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

