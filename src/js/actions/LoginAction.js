import { ActionTypes } from '../constants/constants'

export function loginUser({
  email,
  password
}) {
  return {
    type: ActionTypes.LOGIN_USER,
    payload: {
      email,
      password
    }
  }
}

export function closeLoginErrorBanner() {
  return {
    type: ActionTypes.CLOSE_LOGIN_BANNER_ERROR,
    payload: {}
  }
}

export function closeLoginSuccessBanner() {
  return {
    type: ActionTypes.CLOSE_LOGIN_BANNER_SUCCESS,
    payload: {}
  }
}

