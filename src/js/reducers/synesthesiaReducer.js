import { ActionTypes } from '../constants/constants'

const initialState = {
  error: false,
  isFetchingData: true,
  synesthesiaData: [],
};

export const synesthesiaReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_SYNESTHESIA_SUCCESS:
      return {
        ...state,
        isFetchingData: false,
        synesthesiaData: action.payload.node.children
      }
    case ActionTypes.GET_SYNESTHESIA_FAIL:
      return {
        ...state,
        error: true,
        isFetchingData: false
      }
    default:
      return state
  }

}