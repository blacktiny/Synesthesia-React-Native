import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { } from '../api/api'

const SubscriptionSaga = function* (action) {
  yield put({
    type: ActionTypes.SET_SUBSCRIPTION_TYPE_SUCCESS,
    payload: action.payload.subscriptionType
  });
  if (action.payload.subscriptionType !== '') {
    yield put({
      type: ActionTypes.OPEN_SUCCESS_MODAL
    })
  }
}

export default SubscriptionSaga
