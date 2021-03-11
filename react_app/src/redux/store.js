import {createStore} from 'redux'
import authReducer from './Auth/reducer.js'

const store = createStore(authReducer)
export default store

