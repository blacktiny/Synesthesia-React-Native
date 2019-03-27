import { ActionTypes } from '../constants/constants'

const initialState = {
  toggleType: false,
  requestPending: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_TOGGLE_TYPE:
      return {
        ...state,
        toggleType: action.payload.toggleType
      }
    case ActionTypes.DELETE_USER:
      return {
        ...state,
        requestPending: true
      }
    case ActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        requestPending: false
      }
    case ActionTypes.DELETE_USER_FAIL:
      return {
        ...state,
        requestPending: false
      }
    default:
      return state;
  }
};
