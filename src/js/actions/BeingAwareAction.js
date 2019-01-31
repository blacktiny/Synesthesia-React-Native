import { ActionTypes } from '../constants/constants'

export function getBeingAware() {
  return {
    type: ActionTypes.GET_BEINGAWARE,
    payload: {}
  }
}