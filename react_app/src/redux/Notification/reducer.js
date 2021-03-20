import { SET_NOTIFICATION } from './actions.js'

const initialState = {
    text: "",
    status: ""
}

const notifReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_NOTIFICATION: return {
            text: action.text,
            status: action.status
        }
        default: return state
    }
}
export default notifReducer