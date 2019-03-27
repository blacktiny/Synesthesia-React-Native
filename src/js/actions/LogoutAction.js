import { ActionTypes } from '../constants/constants'

export function logoutUser(logoutFrom) {
  return {
    type: ActionTypes.LOGOUT_USER,
    payload: {
      logoutFrom
    }
  }
}