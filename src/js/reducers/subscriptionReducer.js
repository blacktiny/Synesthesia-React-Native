import { ActionTypes } from '../constants/constants'

const initialState = {
  chosenSubscription: '',
  subscriptionPaid: false
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_SUBSCRIPTION_TYPE_SUCCESS:
      return {
        ...state,
        chosenSubscription: action.payload
      }
    case ActionTypes.PAY_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscriptionPaid: true
      }
    case ActionTypes.PAY_SUBSCRIPTION_FAIL:
      return {
        ...state,
        subscriptionPaid: false
      }
    case ActionTypes.PAY_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscriptionPaid: true
      }
    case ActionTypes.PAY_SUBSCRIPTION_FAIL:
      return {
        ...state,
        subscriptionPaid: false
      }
    case ActionTypes.UNSUBSCRIBE_SUCCESS:
      return {
        ...state,
        subscriptionPaid: false,
        chosenSubscription: ''
      }
    default:
      return state
  }

}

