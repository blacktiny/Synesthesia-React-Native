import { ActionTypes } from '../constants/constants'

const initialState = {
  codeSent: false,
  userNotFound: false
};

export const forgotPasswordReducer = (state = initialState, action) => {
  // debugger;
  switch (action.type) {
    case ActionTypes.SEND_RESET_LINK_SUCCESS:
      return {
        ...state,
        codeSent: true,
        userNotFound: false
      }
    case ActionTypes.SEND_RESET_LINK_FAIL:
      return {
        ...state,
        codeSent: false,
        userNotFound: true
      }
    case ActionTypes.CLOSE_SEND_RESET_LINK_BANNER_SUCCESS:
      return {
        ...state,
        codeSent: false
      }
    case ActionTypes.CLOSE_SEND_RESET_LINK_BANNER_ERROR:
      return {
        ...state,
        codeSent: true
      }
    default:
      return state
  }
}