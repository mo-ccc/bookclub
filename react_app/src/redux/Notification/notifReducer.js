import { SET_NOTIFICATION } from './actions.js'

const initialState = {
    text: "",
    status: ""
}

const notifReducer = (state = initialState, action) => {
    if (action.type == SET_NOTIFICATION){
         return {
            text: action.text,
            status: action.status
        }
    }
    return state
}
export default notifReducer