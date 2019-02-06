import { ActionTypes } from '../constants/constants'

const initialState = {
  url: null
};

export const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MUSIC_SUCCESS:
      return {
        ...state,
        url: action.payload
      }
    default:
      return state
  }
}