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

export function updateUserForm() {
  return {
    type: ActionTypes.UPDATE_USER_FORM,
    payload: {}
  }
}