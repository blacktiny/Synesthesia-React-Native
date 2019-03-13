import { ActionTypes } from '../constants/constants'

const initialState = {
  chosenSubscription: '',
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_SUBSCRIPTION_TYPE_SUCCESS:
      return {
        ...state,
        chosenSubscription: action.payload
      }
    default:
      return state
  }

}