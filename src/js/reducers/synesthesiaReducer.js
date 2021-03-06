import { ActionTypes } from '../constants/constants'

const initialState = {
  error: false,
  isFetchingData: false,
  synesthesiaData: [],
};

export const synesthesiaReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_SYNESTHESIA:
      return {
        ...state,
        isFetchingData: true
      }
    case ActionTypes.GET_SYNESTHESIA_SUCCESS:
      return {
        ...state,
        isFetchingData: false,
        synesthesiaData: action.payload.node
      }
    case ActionTypes.GET_SYNESTHESIA_FAIL:
      return {
        ...state,
        error: true,
        isFetchingData: false
      }
    case ActionTypes.CLEAN_SYNESTHESIA:
      return {
        ...state,
        isFetchingData: true,
        synesthesiaData: []
      }
    default:
      return state
  }

}