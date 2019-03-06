import { ActionTypes } from '../constants/constants'

const initialState = {
  isModalOpened: false,
};

export const blurReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BLUR:
      return {
        ...state,
        isModalOpened: true
      }
    case ActionTypes.REMOVE_BLUR:
      return {
        ...state,
        isModalOpened: false
      }
    default:
      return state
  }
}