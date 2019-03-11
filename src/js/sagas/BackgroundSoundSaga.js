import { AsyncStorage } from 'react-native';

import { put, call, select } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { doCompletion } from '../api/api'

const backgroundSoundSaga = function* (action) {
  yield put({
    type: ActionTypes.START_BACKGROUND_SOUND,
    payload: true
  })
}

export default backgroundSoundSaga
