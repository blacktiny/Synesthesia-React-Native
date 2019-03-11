import { ActionTypes } from '../constants/constants'

export function addBlur() {
  return {
    type: ActionTypes.ADD_BLUR,
    payload: {}
  }
}

export function removeBlur() {
  return {
    type: ActionTypes.REMOVE_BLUR,
    payload: {}
  }
}