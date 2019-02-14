import { ActionTypes } from '../constants/constants'

export function getHeaderItem() {
  return {
    type: ActionTypes.GET_HEADERITEM,
    payload: {}
  }
}

export function setHeaderItem(headerItem) {
  return {
    type: ActionTypes.SET_HEADERITEM,
    payload: {
      headerItem
    }
  }
}