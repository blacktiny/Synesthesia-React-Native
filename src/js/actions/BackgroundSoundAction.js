import { ActionTypes } from '../constants/constants'

export function setBackgroundSound(sound) {
  return {
    type: ActionTypes.SET_BACKGROUND_SOUND,
    payload: { sound }
  }
}

export function setBackgroundSoundVolume(volume) {
  return {
    type: ActionTypes.SET_BACKGROUND_SOUND_VOLUME,
    payload: { volume }
  }
}

export function startBackgroundSoundVolume() {
  return {
    type: ActionTypes.START_BACKGROUND_SOUND,
    payload: { }
  }
}

export function stopBackgroundSoundVolume() {
  return {
    type: ActionTypes.STOP_BACKGROUND_SOUND,
    payload: { }
  }
}