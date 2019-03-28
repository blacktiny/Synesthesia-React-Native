import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { getNodeByID, getNodeByIDAnonymous, getNextNode } from '../api/api'

const NodeSaga = function* (action) {
  const token = yield AsyncStorage.getItem('token');
  const nodeID = yield AsyncStorage.getItem('nodeID');

  if (action.type == ActionTypes.GET_NEXT_NODE) {
    const nextNode = yield call(getNextNode, token);
    if (typeof (nextNode) == "string") {
      const nextNodeObj = { id: nextNode };
      yield put({
        type: ActionTypes.GET_NEXT_NODE_SUCCESS,
        payload: {
          ...nextNodeObj
        }
      })
    } else if (typeof (nextNode) == "object" && nextNode.id) {
      yield put({
        type: ActionTypes.GET_NEXT_NODE_SUCCESS,
        payload: {
          ...nextNode.id
        }
      })
    } else {
      yield put({
        type: ActionTypes.GET_NEXT_NODE_FAIL,
        payload: {}
      })
    }
  }

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
  } else {
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
