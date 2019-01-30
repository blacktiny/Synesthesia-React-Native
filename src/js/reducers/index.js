import { combineReducers } from 'redux'
import { registerReducer } from './registerReducer'
import { loginReducer } from './loginReducer'
import { forgotPasswordReducer } from './forgotPasswordReducer'
import { synesthesiaReducer } from './synesthesiaReducer'
import { sensoriumReducer } from './sensoriumReducer'
import { mindfulnessReducer } from './mindfulnessReducer'
import { nodeReducer } from './nodeReducer'

export default combineReducers({
  registerReducer,
  loginReducer,
  forgotPasswordReducer,
  sensoriumReducer,
  synesthesiaReducer,
  mindfulnessReducer,
  nodeReducer,
})