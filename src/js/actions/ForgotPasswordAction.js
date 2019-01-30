import { ActionTypes } from '../constants/constants'

export function sendResetLink({
  email
}) {
  return {
    type: ActionTypes.SEND_RESET_LINK,
    payload: {
      email
    }
  }
}

export function closeSendResetLinkSuccessBanner() {
  return {
    type: ActionTypes.CLOSE_SEND_RESET_LINK_BANNER_SUCCESS,
    payload: {}
  }
}

export function closeSendResetLinkErrorBanner() {
  return {
    type: ActionTypes.CLOSE_SEND_RESET_LINK_BANNER_ERROR,
    payload: {}
  }
}

