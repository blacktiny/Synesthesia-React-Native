import { ActionTypes, BACKGROUND_SOUNDS, FILES_URL } from '../constants/constants'
import store from '../store'
import Sound from 'react-native-sound'
Sound.setCategory('Playback');

let player = null

const initialState = {
  sound: BACKGROUND_SOUNDS[0],
  volume: 0.5,
  play: false
};

const initAudioPlayer = (file, volume) => {
  if (player) {
    player.release()
  }
  player = new Sound(FILES_URL + file, null, (error) => {
    if (error) {
      return;
    }
    
    store.dispatch({ type: ActionTypes.LOADED })
    player.setVolume(volume)

    play()
  });
}

const play = () => {
  player.play((success) => {
    if (success) {
      player.pause()

      player.setCurrentTime(0)
      setTimeout(() => {
        play()
      }, 1000);
    }
  });
} 
export const backgroundSoundReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_BACKGROUND_SOUND:
      if (action.payload.sound.name !== 'None') {
        if (player) {
          player.release()
        }
      } else {
        if (player) {
          player.release()
        }
      }
      return {
        ...state,
        sound: action.payload.sound,
        play: false
      }
    case ActionTypes.SET_BACKGROUND_SOUND_VOLUME:
      if (player) {
        player.setVolume(action.payload.volume)
      }
      return {
        ...state,
        volume: action.payload.volume
      }
    case ActionTypes.START_BACKGROUND_SOUND: {
      if (state.sound.name !== 'None' && !state.play) {
        initAudioPlayer(state.sound.file, state.volume)
        return {
          ...state,
          loading: true,
          play: true
        }
      } else {
        return {
          ...state,
        }
      }
    }
    case ActionTypes.LOADED: {
      return {
        ...state,
        loading: false
      }
    }
    case ActionTypes.STOP_BACKGROUND_SOUND: {
      if (player) {
        player.release()
      }
      return {
        ...state,
        play: false
      }
    }
    default:
      return state
  }

}