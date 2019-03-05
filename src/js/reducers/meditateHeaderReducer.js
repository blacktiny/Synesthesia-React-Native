import { ActionTypes } from '../constants/constants'

const initialState = {
  curHeaderItem: 'Sensorium',
  bannerIsOpened: false,
};

export const meditateHeaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_HEADERITEM:
      return {
        ...state,
      }
    case ActionTypes.SET_HEADERITEM:
      return {
        ...state,
        curHeaderItem: action.payload.headerItem
      }
    case ActionTypes.BLUR_HEADER:
      return {
        ...state,
        bannerIsOpened: true
      }
    case ActionTypes.UNBLUR_HEADER:
      return {
        ...state,
        bannerIsOpened: false
      }
    default:
      return state
  }
}