import { AsyncStorage } from 'react-native';

import { put, call, select } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { doCompletion } from '../api/api'
export const getUserId = (state) => state.loginReducer.user.id

const completionSaga = function* (action) {
  const token = yield AsyncStorage.getItem('token');
  const nodeID = yield AsyncStorage.getItem('exerciseNodeID');
  const userId = yield select(getUserId);
  if (token !== null && nodeID !== null) {
    const dataObject = yield call(doCompletion, nodeID, userId, token);
    if (dataObject.success) {
      yield put({
        type: ActionTypes.COMPLETE_NODE_SUCCESS,
        payload: true
      })
    }
    else {
      yield put({
        type: ActionTypes.COMPLETE_NODE_FAIL
      })
    }
  }
}

export default completionSaga
