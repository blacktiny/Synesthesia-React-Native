import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { getLocationByWhat3Words } from '../api/api'

const ProfileDetailSaga = function* (action) {
  console.log("address", action.payload.address);
  const dataObject = yield call(getLocationByWhat3Words, action.payload.address);
  if (dataObject.status.reason === 'OK') {
    yield put({
      type: ActionTypes.GET_LOCATION_SUCCESS,
      payload: {
        ...dataObject
      }
    })
  }
  else {
    yield put({
      type: ActionTypes.GET_LOCATION_FAIL
    })
  }
}

export default ProfileDetailSaga
