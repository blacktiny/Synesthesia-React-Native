import { ActionTypes } from '../constants/constants'

const initialState = {
  chosenSubscription: '',
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_SUBSCRIPTION_TYPE:
      return {
        ...state,
        chosenSubscription: action.payload.subscriptionType
      }
    default:
      return state
  }

}