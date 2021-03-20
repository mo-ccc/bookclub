export const SET_NOTIFICATION = 'SET_NOTIFICATION'

export const setNotification = (text, status) => {
    return {
        type: SET_NOTIFICATION,
        text: text,
        status: status
    }
}
