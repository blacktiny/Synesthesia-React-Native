import { ActionTypes } from '../constants/constants'

export function setMenuItem(curItem) {
  return {
    type: ActionTypes.SET_MENUITEM,
    payload: {
      curItem
    }
  }
}

export function getCurMenuItem() {
  return {
    type: ActionTypes.GET_MENUITEM,
    payload: { }
  }
}