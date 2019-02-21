import { ActionTypes } from '../constants/constants'

// const initialState = {
//   loginReducer: {},
//   isLoggedIn: false,
//   user: {},
//   token: null,
// };

const initialState = {
  bGotoMainScreen: false,
  isCheckingLoggedIn: true,
  isLoggedIn: false,
  wrongCredentials: false,
  user: {},
  token: null,
  requestPending: false,
  isUpdatedUser: false,
  requestUpdating: true,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isCheckingLoggedIn: false,
        wrongCredentials: false,
        token: action.payload.token,
        requestPending: true
      }
    case ActionTypes.AUTH_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isCheckingLoggedIn: false,
        wrongCredentials: true,
        requestPending: false
        // token: action.payload.token
      }
    case ActionTypes.LOGIN_USER:
      return {
        ...state,
        isCheckingLoggedIn: false,
        requestPending: true
      }
    case ActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isCheckingLoggedIn: false,
        wrongCredentials: false,
        requestPending: false,
        user: action.payload.user
      }
    case ActionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isCheckingLoggedIn: false,
        wrongCredentials: true,
        requestPending: false
        // user: action.payload.user
      }
    case ActionTypes.CLOSE_LOGIN_BANNER_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        isCheckingLoggedIn: false,
        wrongCredentials: false,
        requestPending: false
        // user: action.payload.user
      }
    case ActionTypes.CLOSE_LOGIN_BANNER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isCheckingLoggedIn: false,
        wrongCredentials: false,
        requestPending: false
      }
    case ActionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        bGotoMainScreen: false,
        isCheckingLoggedIn: false,
        isLoggedIn: false,
        wrongCredentials: false,
        user: {},
        token: null,
        requestPending: false
      }
    case ActionTypes.IS_LOGGEDIN_SUCCESS:
      return {
        ...state,
        bGotoMainScreen: true,
        isCheckingLoggedIn: false,
        isLoggedIn: true,
        user: action.payload.user
      }
    case ActionTypes.IS_LOGGEDIN_NOT:
      return {
        ...state,
        isCheckingLoggedIn: false
      }
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdatedUser: true,
        requestUpdating: false
      }
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdatedUser: false,
        requestUpdating: false
      }
    case ActionTypes.CLEAN_USER_STATUS:
      return {
        ...state,
        isUpdatedUser: false,
        requestUpdating: true
      }
    default:
      return state
  }
}