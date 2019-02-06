import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { getMindFulness, getMindFulnessAnonymous } from '../api/api'

const MindFulnessSaga = function* (action) {
  // debugger;
  const token = yield AsyncStorage.getItem('token');

  if (token !== null) {
    const dataObject = yield call(getMindFulness, token);
    if (dataObject.status.success) {
      yield put({
        type: ActionTypes.GET_MINDFULNESS_SUCCESS,
        payload: {
          ...dataObject
        }
      })
    }
    else {
      yield put({
        type: ActionTypes.GET_MINDFULNESS_FAIL
      })
    }
  }
  else {
    const dataObject = yield call(getMindFulnessAnonymous);
    yield put({
      type: ActionTypes.GET_MINDFULNESS_SUCCESS,
      payload: {
        ...dataObject
      }
    })
  }
}

export default MindFulnessSaga
