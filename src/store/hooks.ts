import { useAppDispatch, useAppSelector } from ".";
import { authLogin, authLogout, uiResetError } from "./actions";
import { getIsLogged } from "./selectors";

export function useAuth() {
    return useAppSelector(getIsLogged)
}

export function useLoginAction() {
    const dispatch = useAppDispatch()
    return function (credentials: {email: string, password: string}) {
        return dispatch(authLogin(credentials))
    }
}

export function useLogoutAction() {
    const dispatch = useAppDispatch()
    return function () {
        return dispatch(authLogout())
    }
}

export function useUiResetError() {
    const dispatch = useAppDispatch()
    return function() {
        return dispatch(uiResetError())
    }
}