import { ActionTypes } from '../constants/constants'

const initialState = {
  curBottomBarItem: '',
};

export const bottomBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_BOTTOM_BAR_ITEM:
      return {
        ...state,
      }
    case ActionTypes.SET_BOTTOM_BAR_ITEM:
      return {
        ...state,
        curBottomBarItem: action.payload.bottomBarItem
      }
    default:
      return state
  }
}