import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { doLogin, getUser, updateUser } from '../api/api'

const LoginUserSaga = function* (action) {
  const token = yield AsyncStorage.getItem('token');
  if (action.type == ActionTypes.LOGIN_USER) {
    const authObject = yield call(doLogin, action.payload);

    if (authObject.status.success) {
      yield put({
        type: ActionTypes.AUTH_SUCCESS,
        payload: {
          ...authObject
        }
      })

      AsyncStorage.setItem('token', authObject.token);
      const user = yield call(getUser, authObject.token);

      if (user.status.success) {
        yield put({
          type: ActionTypes.LOGIN_USER_SUCCESS,
          payload: {
            ...user
          }
        })
        yield put({
          type: ActionTypes.OPEN_SUCCESS_MODAL
        })
        yield put({
          type: ActionTypes.GET_MINDFULNESS
        })
        yield put({
          type: ActionTypes.GET_SYNESTHESIA
        })
        yield put({
          type: ActionTypes.GET_BEINGAWARE
        })
        yield put({
          type: ActionTypes.GET_NODE
        })
      } else {
        yield put({
          type: ActionTypes.LOGIN_USER_FAIL
        })
        yield put({
          type: ActionTypes.OPEN_ERROR_MODAL
        })
      }

    } else {
      yield put({
        type: ActionTypes.AUTH_FAIL
      })
      yield put({
        type: ActionTypes.OPEN_ERROR_MODAL
      })
    }
  } else if (action.type == ActionTypes.UPDATE_USER) {
    if (token !== null) {
      const response = yield call(updateUser, JSON.stringify(action.payload.user), token);

      if (response.status.success) {
        yield put({
          type: ActionTypes.UPDATE_USER_SUCCESS
        })

        yield put({
          type: ActionTypes.OPEN_SUCCESS_MODAL
        })

        const updatedUser = yield call(getUser, token);
        if (updatedUser.status.success) {
          yield put({
            type: ActionTypes.LOGIN_USER_SUCCESS,
            payload: {
              ...updatedUser
            }
          })
        } else {
          yield put({
            type: ActionTypes.LOGIN_USER_FAIL
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
      yield put({
        type: ActionTypes.OPEN_ERROR_MODAL
      })
    }
  }

}

export default LoginUserSaga
