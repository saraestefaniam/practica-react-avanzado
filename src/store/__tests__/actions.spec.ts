import { test, expect } from "vitest"
import { authLoginFulfilled, authLoginPending, authLoginRejected } from "../actions";

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