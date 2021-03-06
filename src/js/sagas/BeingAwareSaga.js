import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { getBeingAware, getBeingAwareAnonymous } from '../api/api'

const BeingAwareSaga = function* (action) {
  const token = yield AsyncStorage.getItem('token');

  if (token !== null) {
    const dataObject = yield call(getBeingAware, token);
    if (dataObject.status.success) {
      yield put({
        type: ActionTypes.GET_BEINGAWARE_SUCCESS,
        payload: {
          ...dataObject
        }
      })
    }
    else {
      yield put({
        type: ActionTypes.GET_BEINGAWARE_FAIL
      })
    }
  }
  else {
    const dataObject = yield call(getBeingAwareAnonymous);
    yield put({
      type: ActionTypes.GET_BEINGAWARE_SUCCESS,
      payload: {
        ...dataObject
      }
    })
  }
}

export default BeingAwareSaga
