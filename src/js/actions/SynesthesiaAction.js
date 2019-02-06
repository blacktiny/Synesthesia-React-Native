import { ActionTypes } from '../constants/constants'

export function getSynesthesia() {
  return {
    type: ActionTypes.GET_SYNESTHESIA,
    payload: {}
  }
}

export function cleanSynesthesia() {
  return {
    type: ActionTypes.CLEAN_SYNESTHESIA,
    payload: {}
  }
}