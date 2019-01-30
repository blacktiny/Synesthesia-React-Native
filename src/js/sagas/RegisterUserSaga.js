// import { REGISTER_USER, REGISTER_USER_SUCCEEDED, REGISTER_USER_FAILED } from '../actions/actionTypes'
// import { put, takeLatest } from 'redux-saga/effects'
// import { Api } from './Api'

// function* saveUser() {
//   try {
//     const receivedUser = yield Api.registerUser()
//     yield put({ type: REGISTER_USER_SUCCEEDED, receivedUser: receivedUser })
//   } catch (error) {
//     yield put({ type: REGISTER_USER_FAILED, error })
//   }
// }

// export function* watchRegisterUser() {
//   yield takeLatest(REGISTER_USER, saveUser)
// }


import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { doRegister } from '../api/api'

const RegisterUserSaga = function* (action) {
  try {
    const registeredUser = yield call(doRegister, action.payload)
    yield put({
      type: ActionTypes.REGISTER_USER_SUCCESS,
      payload: {
        ...registeredUser
      }
    })
  } catch (e) {
    yield put({
      type: ActionTypes.REGISTER_USER_FAIL
    })
    console.log('register error', e)
  }
}

export default RegisterUserSaga
