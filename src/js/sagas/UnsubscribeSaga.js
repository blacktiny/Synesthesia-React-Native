import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { unSubscribe } from '../api/api'
import NavigationServise from '../helpers/navigationService'

const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzMDcyLCJpc3MiOiJodHRwOlwvXC9kZW1vLXN5bmVzdGhlc2lhLnppbWFsYWIuY29tXC9hdXRoIiwiaWF0IjoiMTU1MzE4MTI5OSIsImV4cCI6IjE1NTMyNjc2OTkiLCJuYmYiOiIxNTUzMTgxMjk5IiwianRpIjoiNjFlMDEyYzFhOWVmYjhjZjA2OThlNmY0ZWEwODNiMzIifQ.gmNdW-Ny21ueCaLsLYan62gYIqFWaPP57yhBE0GjBlw'
const UnsubscribeSaga = function* (action) {
  const token = yield AsyncStorage.getItem('token');

  if (token != null) {
    const dataObject = yield call(unSubscribe, TEST_TOKEN);
    console.log(dataObject)
    if (dataObject.status.success) {
      yield put({
        type: ActionTypes.UNSUBSCRIBE_SUCCESS,
      })
      yield put({
        type: ActionTypes.SET_MODAL_TYPE,
        payload: {
          modalType: 'unsubsctibe'
        }
      })
      yield put({
        type: ActionTypes.OPEN_SUCCESS_MODAL,
      })
      NavigationServise.navigate('User')
    } else {
      yield put({
        type: ActionTypes.UNSUBSCRIBE_FAILED
      })
    }
  } else {
    yield put({
      type: ActionTypes.UNSUBSCRIBE_FAILED
    })
    yield put({
      type: ActionTypes.SET_MODAL_TYPE,
      payload: {
        modalType: 'unsubsctibe'
      }
    })
    yield put({
      type: ActionTypes.OPEN_ERROR_MODAL,
    })
  }
}

export default UnsubscribeSaga
