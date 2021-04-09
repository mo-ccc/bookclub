import {createStore, combineReducers} from 'redux'
import authReducer from './Auth/authReducer.js'
import notifReducer from './Notification/notifReducer.js'

const reducers = combineReducers({auth: authReducer, notification: notifReducer})

const store = createStore(reducers)
export default store

