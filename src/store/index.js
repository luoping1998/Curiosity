import { createStore } from 'redux'
import cReducer from './reducers'

let store = createStore(cReducer)

export default store