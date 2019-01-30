import { ActionTypes } from '../constants/constants'

export function logoutUser() {
  return {
    type: ActionTypes.LOGOUT_USER,
    // payload: {
    //   email,
    //   password
    // }
  }
}