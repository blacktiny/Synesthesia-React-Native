import { combineReducers } from 'redux'
import { registerReducer } from './registerReducer'
import { loginReducer } from './loginReducer'
import { forgotPasswordReducer } from './forgotPasswordReducer'
import { sidemenuReducer } from './sidemenuReducer'
import { synesthesiaReducer } from './synesthesiaReducer'
import { mindfulnessReducer } from './mindfulnessReducer'
import { beingawareReducer } from './beingawareReducer'
import { nodeReducer } from './nodeReducer'
import { exerciseReducer } from './exerciseReducer'

export default combineReducers({
  registerReducer,
  loginReducer,
  forgotPasswordReducer,
  sidemenuReducer,
  synesthesiaReducer,
  mindfulnessReducer,
  beingawareReducer,
  nodeReducer,
  exerciseReducer
})