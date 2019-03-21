import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { subscriptionPayment } from '../api/api'

const PaymentSaga = function* (action) {
  const token = yield AsyncStorage.getItem('token');

  if (token != null) {
    const dataObject = yield call(subscriptionPayment, token, {planId: action.payload.planId, stripeToken: 'tok_visa'});
    if (dataObject.status.success) {
      yield put({
        type: ActionTypes.PAY_SUBSCTIPTION_SUCCESS,
        payload: {
          ...dataObject
        }
      })
    }
  } else {
    yield put({
      type: ActionTypes.PAY_SUBSCTIPTION_FAILED
    })
  }
}

export default PaymentSaga
