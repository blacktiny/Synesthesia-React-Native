import { ActionTypes } from '../constants/constants'

const initialState = {
  requestPending: false
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_USER:
      return {
        ...state,
        requestPending: true
      }
    case ActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        requestPending: false
      }
    case ActionTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        requestPending: false
      }
    case ActionTypes.CLOSE_REGISTER_BANNER_ERROR:
      return {
        ...state,
        requestPending: false
      }
    case ActionTypes.CLOSE_REGISTER_BANNER_SUCCESS:
      return {
        ...state,
        requestPending: false
      }
    default:
      return state;
  }
};
