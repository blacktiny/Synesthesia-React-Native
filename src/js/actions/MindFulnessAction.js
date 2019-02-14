import { ActionTypes } from '../constants/constants'

export function getMindFulness() {
  return {
    type: ActionTypes.GET_MINDFULNESS,
    payload: {}
  }
}

export function cleanMindFulness() {
  return {
    type: ActionTypes.CLEAN_MINDFULNESS,
    payload: {}
  }
}