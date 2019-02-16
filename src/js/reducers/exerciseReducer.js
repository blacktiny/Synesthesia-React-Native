import { ActionTypes } from '../constants/constants'

const initialState = {
  exercises: [],
  currentExercise: null,
  exercisesLength: 0,
  currentExerciseIndex: 0
};

export const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
        exercisesLength: action.payload.length,
        currentExerciseIndex: 0,
        currentExercise: action.payload[0]
      }
    default:
      return state
  }
}