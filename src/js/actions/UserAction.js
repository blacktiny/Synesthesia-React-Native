import { ActionTypes } from '../constants/constants'

export function setToggleType(toggleType) {
  return {
    type: ActionTypes.SET_USER_TOGGLE_TYPE,
    payload: {
      toggleType
    }
  }
}

export function deleteUser() {
  return {
    type: ActionTypes.DELETE_USER
  }
}
