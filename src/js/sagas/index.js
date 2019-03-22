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
import completionSaga from './CompletionSaga'
import ExerciseNodeSaga from './ExerciseNodeSaga'
import ProgressSaga from './ProgressSaga'
import BackgroundSoundSaga from './BackgroundSoundSaga'
import SubscriptionSaga from './SubscriptionSaga'
import PaymentSaga from './PaymentSaga'
import UnsubscribeSaga from './UnsubscribeSaga'

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
  yield takeLatest(ActionTypes.GET_EXERCISE_NODE, ExerciseNodeSaga)
  yield takeLatest(ActionTypes.GET_PROGRESS, ProgressSaga)
  yield takeLatest(ActionTypes.UPDATE_USER, LoginUserSaga)
  yield takeLatest(ActionTypes.SET_BACKGROUND_SOUND, BackgroundSoundSaga)
  yield takeLatest(ActionTypes.SET_SUBSCRIPTION_TYPE, SubscriptionSaga),
    yield takeLatest(ActionTypes.PAY_SUBSCRIPTION, PaymentSaga),
    yield takeLatest(ActionTypes.UNSUBSCRIBE, UnsubscribeSaga)

}

export default rootSaga
