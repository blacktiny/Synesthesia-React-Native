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

export function isLoggedInUser() {
  return {
    type: ActionTypes.IS_LOGGEDIN,
    payload: {}
  }
}

export function updateUser(
  user
) {
  return {
    type: ActionTypes.UPDATE_USER,
    payload: {
      user
    }
  }
}

export function cleanUserStatus() {
  return {
    type: ActionTypes.CLEAN_USER_STATUS,
    payload: {}
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

export function logoutUser() {
  return {
    type: ActionTypes.LOGOUT_USER_SUCCESS,
    payload: {}
  }
}

