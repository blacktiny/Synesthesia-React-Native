import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { doRegister } from '../api/api'

const RegisterUserSaga = function* (action) {
  const data = { user: JSON.stringify(action.payload) };

  const registeredObject = yield call(doRegister, data);

  if (registeredObject.status.success) {
    yield put({
      type: ActionTypes.REGISTER_USER_SUCCESS,
      payload: {
        ...registeredObject
      }
    })
  } else {
    yield put({
      type: ActionTypes.REGISTER_USER_FAIL
    })
  }

}

export default RegisterUserSaga
