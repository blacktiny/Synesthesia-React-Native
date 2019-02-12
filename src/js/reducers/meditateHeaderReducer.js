import { ActionTypes } from '../constants/constants'

const initialState = {
  curHeaderItem: 'Sensorium'
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
    default:
      return state
  }
}