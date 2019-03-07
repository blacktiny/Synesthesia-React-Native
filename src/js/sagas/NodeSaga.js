import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { getNodeByID, getNodeByIDAnonymous } from '../api/api'

const NodeSaga = function* (action) {
  const token = yield AsyncStorage.getItem('token');
  const nodeID = yield AsyncStorage.getItem('nodeID');

  if (nodeID !== null) {
    var dataObject;
    if (token !== null)
      dataObject = yield call(getNodeByID, nodeID, token);
    else
      dataObject = yield call(getNodeByIDAnonymous, nodeID);
    if (dataObject.status.success) {
      yield put({
        type: ActionTypes.GET_NODE_SUCCESS,
        payload: {
          ...dataObject
        }
      })
      if (dataObject.node.itemsets) {
        yield put({
          type: ActionTypes.GET_EXERCISES,
          payload: dataObject.node.itemsets
        })
      }
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
