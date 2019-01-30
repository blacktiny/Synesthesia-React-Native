import { ActionTypes } from '../constants/constants'

export function getSensorium() {
  return {
    type: ActionTypes.GET_SENSORIUM,
    payload: {}
  }
}