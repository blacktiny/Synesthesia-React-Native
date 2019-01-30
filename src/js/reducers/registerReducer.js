import { ActionTypes } from '../constants/constants'

const initialState = {
  // users: []
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    // case DO_SIGNUP_SUCCESS:
    //   return {
    //     ...state,
    //     signupResponse: action.data,
    //     isSignupSuccess: action.data.success
    //   }
    case ActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        // users: [...state.users, action.payload] 
      };
    default:
      return state;
  }
};
