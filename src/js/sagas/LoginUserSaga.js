import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { doLogin, getUser, updateUser } from '../api/api'

const LoginUserSaga = function* (action) {
  const token = yield AsyncStorage.getItem('token');

  if (action.type == ActionTypes.IS_LOGGEDIN) {
    if (token !== null) {
      const user = yield call(getUser, action.payload, token);
      if (user.status.success) {
        yield put({
          type: ActionTypes.IS_LOGGEDIN_SUCCESS,
          payload: {
            ...user
          }
        })
      } else {
        yield put({
          type: ActionTypes.IS_LOGGEDIN_FAIL
        })
      }
    } else {
      yield put({
        type: ActionTypes.IS_LOGGEDIN_NOT
      })
    }
  } else if (action.type == ActionTypes.LOGIN_USER) {
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

      // AsyncStorage.setItem('userId', user.user.id);
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
  } else if (action.type == ActionTypes.UPDATE_USER) {
    if (token !== null) {
      const response = yield call(updateUser, JSON.stringify(action.payload.user), token);

      if (response.status.success) {
        yield put({
          type: ActionTypes.UPDATE_USER_SUCCESS
        })

        const user = yield call(getUser, action.payload, token);
        if (user.status.success) {
          yield put({
            type: ActionTypes.LOGIN_USER_SUCCESS,
            payload: {
              ...user
            }
          })
        } else {
          yield put({
            type: ActionTypes.UPDATE_USER_FAIL
          })
        }
      } else {
        yield put({
          type: ActionTypes.UPDATE_USER_FAIL
        })
      }
    } else {
      yield put({
        type: ActionTypes.UPDATE_USER_FAIL
      })
    }
  }

}

export default LoginUserSaga
