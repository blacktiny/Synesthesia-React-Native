import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { deleteUser } from '../api/api'

const UserSaga = function* () {
  const token = yield AsyncStorage.getItem('token');
  const deletedUser = yield call(deleteUser, token);
  if (deletedUser.status.success) {
    yield put({
      type: ActionTypes.DELETE_USER_SUCCESS
    })
  } else {
    yield put({
      type: ActionTypes.DELETE_USER_FAIL
    })
    yield put({
      type: ActionTypes.OPEN_ERROR_MODAL
    })
  }

}

export default UserSaga
