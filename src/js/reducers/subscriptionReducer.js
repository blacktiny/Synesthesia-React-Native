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
    case ActionTypes.PAY_SUBSCTIPTION_SUCCESS:
      return {
        ...state,
        subscriptionPaid: true
      }
    case ActionTypes.PAY_SUBSCTIPTION_FAILED:
      return {
        ...state,
        subscriptionPaid: false
      }
    default:
      return state
  }

}

