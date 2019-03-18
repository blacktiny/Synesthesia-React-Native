import { ActionTypes } from '../constants/constants'

export function getBottomBarItem() {
  return {
    type: ActionTypes.GET_BOTTOM_BAR_ITEM,
    payload: {}
  }
}

export function setBottomBarItem(bottomBarItem, curActiveScreen = '') {
  return {
    type: ActionTypes.SET_BOTTOM_BAR_ITEM,
    payload: {
      bottomBarItem,
      curActiveScreen
    }
  }
}

export function toggleBottomBar(showBottomBar) {
  return {
    type: ActionTypes.TOGGLE_BOTTOM_BAR,
    payload: {
      showBottomBar
    }
  }
}
