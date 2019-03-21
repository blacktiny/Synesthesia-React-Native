import { takeLatest } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import ProfileDetailSaga from './ProfileDetailSaga'

const rootSaga = function* () {
  yield takeLatest(ActionTypes.GET_LOCATION, ProfileDetailSaga)
}

export default rootSaga
