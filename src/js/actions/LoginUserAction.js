import { ActionTypes } from '../constants/constants'

export function storeIDNumber(idNumber) {
  return {
    type: ActionTypes.STORE_ID_NUMBER,
    payload: {
      idNumber
    }
  }
}