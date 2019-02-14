import { ActionTypes } from '../constants/constants'

export function getUserProgress() {
  return {
    type: ActionTypes.GET_PROGRESS,
    payload: {}
  }
}

export function cleanProgress() {
  return {
    type: ActionTypes.CLEAN_PROGRESS,
    payload: {}
  }
}