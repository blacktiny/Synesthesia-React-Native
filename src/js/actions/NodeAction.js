import { ActionTypes } from '../constants/constants'

export function getNodeByID() {
  return {
    type: ActionTypes.GET_NODE,
    payload: {}
  }
}

export function getExerciseNodeByID() {
  return {
    type: ActionTypes.GET_EXERCISE_NODE,
    payload: {}
  }
}

export function completeNode() {
  return {
    type: ActionTypes.COMPLETE_NODE,
    payload: {}
  }
}

export function clearNode() {
  return {
    type: ActionTypes.CLEAR_NODE,
    payload: {}
  }
}

export function setVolume(volume) {
  return {
    type: ActionTypes.SET_VOLUME,
    payload: { volume }
  }
}

export function getNextNode() {
  return {
    type: ActionTypes.GET_NEXT_NODE,
    payload: {}
  }
}