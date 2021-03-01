import { SET_TENANT } from './actions.js'

const initialState = {
    data: {}
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_TENANT: return {
            data: action.data
        }
        default: return state
    }
}
export default authReducer