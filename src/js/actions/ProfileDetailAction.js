import { ActionTypes } from '../constants/constants'

export function getLocationByWhat3Words(address) {
  return {
    type: ActionTypes.GET_LOCATION,
    payload: {
      address
    }
  }
}