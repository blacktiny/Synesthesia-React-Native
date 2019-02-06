import { ActionTypes } from '../constants/constants'

export function getMusic() {
  return {
    type: ActionTypes.GET_MUSIC,
    payload: {}
  }
}