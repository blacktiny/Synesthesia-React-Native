import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { getSensorium } from '../api/api'

const SensoriumSaga = function* (action) {
  // debugger;
  const token = yield AsyncStorage.getItem('token');
  
  if (token !== null) {
    const dataObject = yield call(getSensorium, token);
    if (dataObject.status.success) {
      yield put({
        type: ActionTypes.GET_SENSORIUM_SUCCESS,
        payload: {
          ...dataObject
        }
      })
    }
    else {
      yield put({
        type: ActionTypes.GET_SENSORIUM_FAIL
      })
    }
  }
  else {
    const dataObject = null;
    yield put({
      type: ActionTypes.GET_SENSORIUM_SUCCESS,
      payload: {
        ...dataObject
      }
    })
  }
}

export default SensoriumSaga
