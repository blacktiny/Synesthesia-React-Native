import { ActionTypes } from '../constants/constants'

export function getSynesthesia() {
  return {
    type: ActionTypes.GET_SYNESTHESIA,
    payload: {}
  }
}