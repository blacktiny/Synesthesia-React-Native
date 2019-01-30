import { ActionTypes } from '../constants/constants'

const initialState = {
  error: false,
  isFetchingData: true,
  sensoriumData: [],
};

export const sensoriumReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_SENSORIUM_SUCCESS:
      return {
        ...state,
        isFetchingData: false,
        sensoriumData: action.payload.node.children
      }
    case ActionTypes.GET_SENSORIUM_FAIL:
      return {
        ...state,
        error: true,
        isFetchingData: false
      }
    default:
      return state
  }

}