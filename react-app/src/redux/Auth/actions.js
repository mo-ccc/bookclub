export const SET_AUTH = 'SET_AUTH'

export const setAuth = (token) => {
    return {
        type: SET_AUTH,
        token: token
    }
}
