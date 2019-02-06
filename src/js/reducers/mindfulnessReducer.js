import { ActionTypes } from '../constants/constants'

const initialState = {
  error: false,
  isFetchingData: true,
  mindfulnessData: [],
};

export const mindfulnessReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MINDFULNESS_SUCCESS:
      return {
        ...state,
        isFetchingData: false,
        mindfulnessData: action.payload.node
      }
    case ActionTypes.GET_MINDFULNESS_FAIL:
      return {
        ...state,
        error: true,
        isFetchingData: false
      }
    case ActionTypes.CLEAN_MINDFULNESS:
      return {
        ...state,
        isFetchingData: false,
        mindfulnessData: []
      }
    default:
      return state
  }

}