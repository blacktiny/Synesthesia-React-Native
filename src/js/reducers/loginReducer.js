import { ActionTypes } from '../constants/constants'

// const initialState = {
//   loginReducer: {},
//   isLoggedIn: false,
//   user: {},
//   token: null,
// };

const initialState = {
  isLoggedIn: false,
  wrongCredentials: false,
  user: {},
  token: null,
  requestPending: false
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        wrongCredentials: false,
        token: action.payload.token,
        requestPending: true
      }
    case ActionTypes.AUTH_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        wrongCredentials: true,
        requestPending: false
        // token: action.payload.token
      }
    case ActionTypes.LOGIN_USER:
      return {
        ...state,
        requestPending: true
      }
    case ActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        wrongCredentials: false,
        requestPending: false,
        user: action.payload.user
      }
    case ActionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        wrongCredentials: true,
        requestPending: false
        // user: action.payload.user
      }
    case ActionTypes.CLOSE_LOGIN_BANNER_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        wrongCredentials: false,
        requestPending: false
        // user: action.payload.user
      }
    case ActionTypes.CLOSE_LOGIN_BANNER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        wrongCredentials: false,
        requestPending: false
      }
    case ActionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        wrongCredentials: false,
        token: null,
        requestPending: false
      }
    default:
      return state
  }
}