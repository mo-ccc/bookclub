import {createStore, combineReducers} from 'redux'
import authReducer from './Auth/reducer.js'
import notifReducer from './Notification/reducer.js'

const reducers = combineReducers({auth: authReducer, notification: notifReducer})

const store = createStore(reducers)
export default store

