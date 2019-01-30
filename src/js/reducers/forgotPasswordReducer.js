import { ActionTypes } from '../constants/constants'

const initialState = {
  codeSent: false,
  userNotFound: false,
  requestPending: false
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEND_RESET_LINK:
      return {
        ...state,
        codeSent: false,
        userNotFound: false,
        requestPending: true
      }
    case ActionTypes.SEND_RESET_LINK_SUCCESS:
      return {
        ...state,
        codeSent: true,
        userNotFound: false,
        requestPending: false
      }
    case ActionTypes.SEND_RESET_LINK_FAIL:
      return {
        ...state,
        codeSent: false,
        userNotFound: true,
        requestPending: false
      }
    case ActionTypes.CLOSE_SEND_RESET_LINK_BANNER_SUCCESS:
      return {
        ...state,
        codeSent: false,
        userNotFound: false,
        requestPending: false
      }
    case ActionTypes.CLOSE_SEND_RESET_LINK_BANNER_ERROR:
      return {
        ...state,
        codeSent: false,
        userNotFound: false,
        requestPending: false
      }
    default:
      return state
  }
}