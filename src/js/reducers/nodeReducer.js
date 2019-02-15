import { ActionTypes } from '../constants/constants'

const initialState = {
  error: false,
  isFetchingData: true,
  nodeData: [],
  exerciseNode: [],
  nodeComplete: false
};

export const nodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_NODE_SUCCESS:
      return {
        ...state,
        isFetchingData: false,
        nodeData: action.payload.node,
        nodeComplete: false
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
        isFetchingData: true,
        nodeComplete: false
      }
     case ActionTypes.GET_EXERCISE_NODE_SUCCESS:
      return {
        ...state,
        isFetchingData: false,
        exerciseNode: action.payload.node,
        nodeComplete: false
      }
    case ActionTypes.GET_EXERCISE_NODE_FAIL:
      return {
        ...state,
        error: true,
        isFetchingData: false
      }
    case ActionTypes.COMPLETE_NODE_SUCCESS:
      return {
        ...state,
        isFetchingData: false,
        nodeComplete: action.payload
      }
    case ActionTypes.COMPLETE_NODE_FAIL:
      return {
        ...state,
        error: true,
        isFetchingData: false
      }
    case ActionTypes.COMPLETE_NODE:
      return {
        ...state,
        isFetchingData: true
      }
    default:
      return state
  }

}