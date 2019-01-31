import { ActionTypes } from '../constants/constants'

const initialState = {
  error: false,
  isFetchingData: true,
  beingawareData: [],
};

export const beingawareReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_BEINGAWARE_SUCCESS:
      return {
        ...state,
        isFetchingData: false,
        beingawareData: action.payload.node
      }
    case ActionTypes.GET_BEINGAWARE_FAIL:
      return {
        ...state,
        error: true,
        isFetchingData: false
      }
    default:
      return state
  }

}