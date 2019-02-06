import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { doLogin, getUser } from '../api/api'

const LoginUserSaga = function* (action) {
  // debugger;
  const authObject = yield call(doLogin, action.payload);

  if (authObject.status.success) {
    yield put({
      type: ActionTypes.AUTH_SUCCESS,
      payload: {
        ...authObject
      }
    })

    // AsyncStorage.setItem('token', userObject.token); // example
    AsyncStorage.setItem('token', authObject.token);
    const user = yield call(getUser, action.payload, authObject.token);

    if (user.status.success) {
      yield put({
        type: ActionTypes.LOGIN_USER_SUCCESS,
        payload: {
          ...user
        }
      })
    } else {
      yield put({
        type: ActionTypes.LOGIN_USER_FAIL
      })
    }

  } else {
    yield put({
      type: ActionTypes.AUTH_FAIL
    })
  }

}

export default LoginUserSaga
