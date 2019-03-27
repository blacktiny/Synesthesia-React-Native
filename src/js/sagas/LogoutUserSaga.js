import { AsyncStorage } from 'react-native';

import { put } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'

const LogoutUserSaga = function* (action) {
  try {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userId');
    yield put({
      type: ActionTypes.LOGOUT_USER_SUCCESS
    })
    if (action.payload.logoutFrom == 'fromSideMenu') {
      yield put({
        type: ActionTypes.OPEN_SUCCESS_MODAL
      })
    }
  } catch (e) {
    yield put({
      type: ActionTypes.LOGOUT_USER_FAIL
    })
    console.log('logout error', e)
  }
}

export default LogoutUserSaga
