import { ActionTypes } from '../constants/constants'

const initialState = {
  requestPending: false
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEND_RESET_LINK:
      return {
        ...state,
        requestPending: true
      }
    case ActionTypes.SEND_RESET_LINK_SUCCESS:
      return {
        ...state,
        requestPending: false
      }
    case ActionTypes.SEND_RESET_LINK_FAIL:
      return {
        ...state,
        requestPending: false
      }
    default:
      return state
  }
}