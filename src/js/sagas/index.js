import { takeLatest } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import LoginUserSaga from './LoginUserSaga'
import RegisterUserSaga from './RegisterUserSaga'
import ForgotPasswordSaga from './ForgotPasswordSaga'
import LogoutUserSaga from './LogoutUserSaga'
import SynesthesiaSaga from './SynesthesiaSaga'
import MindFulnessSaga from './MindFulnessSaga'
import BeingAwareSaga from './BeingAwareSaga'
import NodeSaga from './NodeSaga'
import completionSaga from './Completion'

const rootSaga = function* () {
  yield takeLatest(ActionTypes.LOGIN_USER, LoginUserSaga)
  yield takeLatest(ActionTypes.REGISTER_USER, RegisterUserSaga)
  yield takeLatest(ActionTypes.SEND_RESET_LINK, ForgotPasswordSaga)
  yield takeLatest(ActionTypes.LOGOUT_USER, LogoutUserSaga)
  yield takeLatest(ActionTypes.GET_SYNESTHESIA, SynesthesiaSaga)
  yield takeLatest(ActionTypes.GET_MINDFULNESS, MindFulnessSaga)
  yield takeLatest(ActionTypes.GET_BEINGAWARE, BeingAwareSaga)
  yield takeLatest(ActionTypes.GET_NODE, NodeSaga)
  yield takeLatest(ActionTypes.COMPLETE_NODE, completionSaga)

}

export default rootSaga
