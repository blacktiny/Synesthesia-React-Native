import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { getNodeByID } from '../api/api'

const NodeSaga = function* (action) {
  // debugger;
  const token = yield AsyncStorage.getItem('token');
  const nodeID = yield AsyncStorage.getItem('nodeID');
  
  if (token !== null && nodeID !== null) {
    const dataObject = yield call(getNodeByID, nodeID, token);
    if (dataObject.status.success) {
      yield put({
        type: ActionTypes.GET_NODE_SUCCESS,
        payload: {
          ...dataObject
        }
      })
    }
    else {
      yield put({
        type: ActionTypes.GET_NODE_FAIL
      })
    }
  }
  else {
    const dataObject = null;
    yield put({
      type: ActionTypes.GET_NODE_SUCCESS,
      payload: {
        ...dataObject
      }
    })
  }
}

export default NodeSaga
