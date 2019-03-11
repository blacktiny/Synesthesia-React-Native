import { ActionTypes } from '../constants/constants'

const initialState = {
  isLoggedIn: false,
  user: {},
  token: null,
  requestPending: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        token: action.payload.token,
        requestPending: true
      }
    case ActionTypes.AUTH_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        requestPending: false
        // token: action.payload.token
      }
    case ActionTypes.LOGIN_USER:
      return {
        ...state,
        requestPending: true,
      }
    case ActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        requestPending: false,
        user: action.payload.user
      }
    case ActionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        requestPending: false
        // user: action.payload.user
      }
    case ActionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        token: null,
        requestPending: false
      }
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        requestPending: true
      }
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        requestPending: false
      }
    case ActionTypes.UPDATE_USER_FAIL:
      return {
        ...state,
        requestPending: false
      }
    default:
      return state
  }
}