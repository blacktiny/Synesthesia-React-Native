import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { getProgress } from '../api/api'

const ProgressSaga = function* (action) {
  const token = yield AsyncStorage.getItem('token');

  if (token != null) {
    const dataObject = yield call(getProgress, token);
    // if (dataObject.status.success) {
    yield put({
      type: ActionTypes.GET_PROGRESS_SUCCESS,
      payload: {
        ...dataObject
      }
    })
    // }
    // else {
    //   yield put({
    //     type: ActionTypes.GET_PROGRESS_FAIL
    //   })
    // }
  }
}

export default ProgressSaga
