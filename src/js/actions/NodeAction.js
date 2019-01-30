import { ActionTypes } from '../constants/constants'

export function getNodeByID() {
  return {
    type: ActionTypes.GET_NODE,
    payload: {}
  }
}

export function clearNode() {
  return {
    type: ActionTypes.CLEAR_NODE,
    payload: {}
  }
}