import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { forgotPassword } from '../api/api'

const ForgotPasswordSaga = function* (action) {
  // debugger;
  const apiObject = yield call(forgotPassword, action.payload.email);
  // console.log(apiObject);

  if (apiObject.code) {
    yield put({
      type: ActionTypes.SEND_RESET_LINK_SUCCESS
    })
  } else {
    yield put({
      type: ActionTypes.SEND_RESET_LINK_FAIL
    })
  }
}

export default ForgotPasswordSaga
