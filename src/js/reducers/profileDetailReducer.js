import { ActionTypes } from '../constants/constants'

const initialState = {
  location: {
    lng: -0.203586,
    lat: 51.521251
  }
};

export const profileDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_LOCATION_SUCCESS:
      return {
        ...state,
        location: action.payload.geometry
      }
    case ActionTypes.GET_LOCATION_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}