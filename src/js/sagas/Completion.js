import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { doCompletion, getMindFulness } from '../api/api'

const completionSaga = function* (action) {
  const token = yield AsyncStorage.getItem('token');
  const nodeID = yield AsyncStorage.getItem('nodeID');
  const userId = yield AsyncStorage.getItem('userId');
  if (token !== null && nodeID !== null) {
    const dataObject = yield call(doCompletion, nodeID, userId, token);
    if (dataObject.success) {
      yield put({
        type: ActionTypes.COMPLETE_NODE_SUCCESS,
        payload: true
      })
      const object = yield call(getMindFulness, token);
      if (object.status.success) {
        yield put({
          type: ActionTypes.GET_MINDFULNESS_SUCCESS,
          payload: {
            ...object
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
      yield put({
        type: ActionTypes.COMPLETE_NODE_FAIL
      })
    }
  }
}

export default completionSaga
