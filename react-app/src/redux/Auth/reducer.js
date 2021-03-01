import { SET_AUTH } from './actions.js'

const initialState = {
    token: ""
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH: return {
            token: action.token
        }
        default: return state
    }
}
export default authReducer