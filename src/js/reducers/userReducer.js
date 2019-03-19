import { ActionTypes } from '../constants/constants'

const initialState = {
  toggleType: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_TOGGLE_TYPE:
      return {
        ...state,
        toggleType: action.payload.toggleType
      }
    default:
      return state;
  }
};
