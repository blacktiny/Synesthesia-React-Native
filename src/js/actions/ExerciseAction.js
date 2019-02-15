import { ActionTypes } from '../constants/constants'

export function getExercises(exercises) {
  return {
    type: ActionTypes.GET_EXERCISES,
    payload: exercises
  }
}

export function nextExercise() {
  return {
    type: ActionTypes.NEXT_EXERCISE,
    payload: {}
  }
}