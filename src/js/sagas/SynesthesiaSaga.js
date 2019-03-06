import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { getSynesthesia, getSynesthesiaAnonymous } from '../api/api'

const SynesthesiaSaga = function* (action) {
  const token = yield AsyncStorage.getItem('token');

  if (token !== null) {
    const dataObject = yield call(getSynesthesia, token);
    if (dataObject.status.success) {
      yield put({
        type: ActionTypes.GET_SYNESTHESIA_SUCCESS,
        payload: {
          ...dataObject
        }
      })
    }
    else {
      yield put({
        type: ActionTypes.GET_SYNESTHESIA_FAIL
      })
    }
  }
  else {
    const dataObject = yield call(getSynesthesiaAnonymous);
    yield put({
      type: ActionTypes.GET_SYNESTHESIA_SUCCESS,
      payload: {
        ...dataObject
      }
    })
  }
}

export default SynesthesiaSaga
