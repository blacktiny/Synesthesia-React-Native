import { ActionTypes } from '../constants/constants'

export function getBottomBarItem() {
  return {
    type: ActionTypes.GET_BOTTOM_BAR_ITEM,
    payload: {}
  }
}

export function setBottomBarItem(bottomBarItem) {
  return {
    type: ActionTypes.SET_BOTTOM_BAR_ITEM,
    payload: {
      bottomBarItem
    }
  }
}
