import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { forgotPassword } from '../api/api'

const ForgotPasswordSaga = function* (action) {
  const apiObject = yield call(forgotPassword, action.payload.email);

  if (apiObject.code) {
    yield put({
      type: ActionTypes.SEND_RESET_LINK_SUCCESS
    })
    yield put({
      type: ActionTypes.OPEN_SUCCESS_MODAL
    })
  } else {
    yield put({
      type: ActionTypes.SEND_RESET_LINK_FAIL
    })
    yield put({
      type: ActionTypes.OPEN_ERROR_MODAL
    })
  }
}

export default ForgotPasswordSaga
