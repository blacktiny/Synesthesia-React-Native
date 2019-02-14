import { ActionTypes } from '../constants/constants'

const initialState = {
  error: false,
  currentItem: 'Meditate in Sensorium',
};

export const sidemenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_MENUITEM:
      return {
        ...state,
        currentItem: action.payload.curItem
      }
    default:
      return state
  }

}