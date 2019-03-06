import { AsyncStorage } from 'react-native';

import { put, call, select } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { getMindFulness, getMindFulnessAnonymous } from '../api/api'

export const getMindfulnessData = (state) => state.mindfulnessReducer.mindfulnessData;

const MindFulnessSaga = function* (action) {
  const token = yield AsyncStorage.getItem('token');
  const mindfulnessData = yield select(getMindfulnessData);

  // if (mindfulnessData.length == 0) {
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
  // }
}

export default MindFulnessSaga
