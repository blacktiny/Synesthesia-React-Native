import { ActionTypes } from '../constants/constants'

const initialState = {
  error: false,
  isFetchingData: false,
  beingawareData: [],
};

export const beingawareReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_BEINGAWARE:
      return {
        ...state,
        isFetchingData: true
      }
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
    case ActionTypes.CLEAN_AWARENESS:
      return {
        ...state,
        isFetchingData: true,
        beingawareData: []
      }
    default:
      return state
  }

}