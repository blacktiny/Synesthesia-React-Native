import { takeLatest } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import LoginUserSaga from './LoginUserSaga'
import RegisterUserSaga from './RegisterUserSaga'
import ForgotPasswordSaga from './ForgotPasswordSaga'
import LogoutUserSaga from './LogoutUserSaga'
import SynesthesiaSaga from './SynesthesiaSaga'
import SensoriumSaga from './SensoriumSaga'
import MindFulnessSaga from './MindFulnessSaga'
import NodeSaga from './NodeSaga'

const rootSaga = function* () {
  yield takeLatest(ActionTypes.LOGIN_USER, LoginUserSaga)
  yield takeLatest(ActionTypes.REGISTER_USER, RegisterUserSaga)
  yield takeLatest(ActionTypes.SEND_RESET_LINK, ForgotPasswordSaga)
  yield takeLatest(ActionTypes.LOGOUT_USER, LogoutUserSaga)
  yield takeLatest(ActionTypes.GET_SENSORIUM, SensoriumSaga)
  yield takeLatest(ActionTypes.GET_SYNESTHESIA, SynesthesiaSaga)
  yield takeLatest(ActionTypes.GET_MINDFULNESS, MindFulnessSaga)
  yield takeLatest(ActionTypes.GET_NODE, NodeSaga)
}

export default rootSaga
