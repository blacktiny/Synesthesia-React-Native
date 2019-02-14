import { ActionTypes } from '../constants/constants'

const initialState = {
  error: false,
  isFetchingData: true,
  progressData: null,
};

export const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PROGRESS_SUCCESS:
      return {
        ...state,
        isFetchingData: false,
        progressData: action.payload
      }
    case ActionTypes.GET_PROGRESS_ANONYMOUS:
        return {
          ...state,
          isFetchingData: false,
          progressData: null
        }
    case ActionTypes.GET_PROGRESS_FAIL:
      return {
        ...state,
        error: true,
        isFetchingData: false
      }
    case ActionTypes.CLEAN_PROGRESS:
      return {
        ...state,
        isFetchingData: true,
        progressData: null
      }
    default:
      return state
  }

}