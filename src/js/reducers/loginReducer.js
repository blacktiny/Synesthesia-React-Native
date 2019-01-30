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
};

export const loginReducer = (state = initialState, action) => {
  // console.log("In loginReducer...");
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        wrongCredentials: false,
        token: action.payload.token
      }
    case ActionTypes.AUTH_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        wrongCredentials: true
        // token: action.payload.token
      }
    case ActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        wrongCredentials: false,
        // loginResponse: action.payload,
        // isLoggedIn: action.payload.status.success,
        user: action.payload.user
      }
    case ActionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        wrongCredentials: true
        // loginResponse: action.payload,
        // isLoggedIn: action.payload.status.success,
        // user: action.payload.user
      }
    case ActionTypes.CLOSE_LOGIN_BANNER_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        wrongCredentials: false
        // loginResponse: action.payload,
        // isLoggedIn: action.payload.status.success,
        // user: action.payload.user
      }
    case ActionTypes.CLOSE_LOGIN_BANNER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        wrongCredentials: false
        // loginResponse: action.payload,
        // isLoggedIn: action.payload.status.success,
        // user: action.payload.user
      }
    case ActionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loginReducer: {},
        isLoggedIn: false,
        user: {},
        token: null
      }
    default:
      return state
  }

}