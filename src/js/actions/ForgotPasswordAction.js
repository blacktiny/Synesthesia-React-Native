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


