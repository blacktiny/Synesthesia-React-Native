import { ActionTypes } from '../constants/constants'

const initialState = {
  error: false,
  isFetchingData: true,
  nodeData: [],
};

export const nodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_NODE_SUCCESS:
      return {
        ...state,
        isFetchingData: false,
        nodeData: action.payload.node
      }
    case ActionTypes.GET_NODE_FAIL:
      return {
        ...state,
        error: true,
        isFetchingData: false
      }
    case ActionTypes.CLEAR_NODE:
      return {
        ...state,
        isFetchingData: true
      }
    default:
      return state
  }

}