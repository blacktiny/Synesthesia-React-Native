import { ActionTypes } from '../constants/constants'

const initialState = {
  idNumber: ''
};

export const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_ID_NUMBER:
      return {
        ...state,
        idNumber: action.payload.idNumber
      }
    default:
      return state
  }
}