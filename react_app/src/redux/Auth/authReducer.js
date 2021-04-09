import { SET_AUTH } from './actions.js'

const initialState = {
    token: ""
}

const authReducer = (state = initialState, action) => {
    if (action.type == SET_AUTH) {
        return {
            token: action.token
        }
    }
    return state
}
export default authReducer