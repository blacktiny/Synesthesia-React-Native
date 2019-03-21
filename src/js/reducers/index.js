import { combineReducers } from 'redux'
import { loginUserReducer } from './loginUserReducer'
import { profileDetailReducer } from './profileDetailReducer'

export default combineReducers({
  loginUserReducer,
  profileDetailReducer
})