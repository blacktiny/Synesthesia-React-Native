import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  LOGIN_USER: null,
  LOGIN_USER_SUCCESS: null,
  LOGIN_USER_FAIL: null,

  SEND_RESET_LINK: null,
  SEND_RESET_LINK_SUCCESS: null,
  SEND_RESET_LINK_FAIL: null,

  REGISTER_USER: null,
  REGISTER_USER_SUCCESS: null,
  REGISTER_USER_FAIL: null,

  AUTH: null,
  AUTH_SUCCESS: null,
  AUTH_FAIL: null,
  LOADED: null,
  STOP_BACKGROUND_SOUND: null,
  START_BACKGROUND_SOUND: null,

  SET_BACKGROUND_SOUND: null,
  SET_BACKGROUND_SOUND_VOLUME: null,

  LOGOUT_USER: null,
  LOGOUT_USER_SUCCESS: null,
  LOGOUT_USER_FAIL: null,

  GET_EXERCISES: null,
  GET_CURRENT_EXERCISE: null,

  COMPLETE_NODE: null,
  COMPLETE_NODE_SUCCESS: null,
  COMPLETE_NODE_FAIL: null,

  SET_MENUITEM: null,
  GET_MENUITEM: null,

  GET_SYNESTHESIA: null,
  GET_SYNESTHESIA_SUCCESS: null,
  GET_SYNESTHESIA_FAIL: null,

  GET_MINDFULNESS: null,
  GET_MINDFULNESS_SUCCESS: null,
  GET_MINDFULNESS_FAIL: null,

  GET_BEINGAWARE: null,
  GET_BEINGAWARE_SUCCESS: null,
  GET_BEINGAWARE_FAIL: null,

  GET_NODE: null,
  GET_NODE_SUCCESS: null,
  GET_NODE_FAIL: null,

  GET_EXERCISE_NODE: null,
  GET_EXERCISE_NODE_SUCCESS: null,
  GET_EXERCISE_NODE_FAIL: null,

  NEXT_EXERCISE: null,

  CLEAR_NODE: null,
  // CLEAR_EXERCISE_NODE: null,

  CLEAN_SYNESTHESIA: null,
  CLEAN_MINDFULNESS: null,
  CLEAN_AWARENESS: null,
  CLEAN_PROGRESS: null,

  GET_HEADERITEM: null,
  SET_HEADERITEM: null,

  GET_PROGRESS: null,
  GET_PROGRESS_SUCCESS: null,
  GET_PROGRESS_ANONYMOUS: null,
  GET_PROGRESS_FAIL: null,

  UPDATE_USER: null,
  UPDATE_USER_SUCCESS: null,
  UPDATE_USER_FAIL: null,
  SET_VOLUME: null,
  CLEAN_USER_STATUS: null,

  OPEN_LOGIN_MODAL: null,
  CLOSE_LOGIN_MODAL: null,

  OPEN_REGISTER_MODAL: null,
  CLOSE_REGISTER_MODAL: null,

  OPEN_FORGOT_PASSWORD_MODAL: null,
  CLOSE_FORGOT_PASSWORD_MODAL: null,

  OPEN_SUCCESS_MODAL: null,
  CLOSE_SUCCESS_MODAL: null,

  OPEN_ERROR_MODAL: null,
  CLOSE_ERROR_MODAL: null,

  BLUR_HEADER: null,
  UNBLUR_HEADER: null
})

export const Theme = {
  // FONT_LIGHT: 'RawlineLight-Regular',
  // FONT_REGULAR: 'Rawline-Regular',
  // FONT_MEDIUM: 'RawlineMedium-Regular',
  // FONT_SEMIBOLD: 'RawlineSemiBold-Regular',
  // FONT_BOLD: 'Rawline-Bold'
  FONT_LIGHT: 'Raleway-Regular',
  FONT_REGULAR: 'Raleway-Regular',
  FONT_MEDIUM: 'Raleway-Regular',
  FONT_SEMIBOLD: 'Raleway-Regular',
  FONT_BOLD: 'Raleway-Bold'
}

export const FILES_URL = 'https://s3-us-west-2.amazonaws.com/synesthesia-files/'

export const BACKGROUND_SOUNDS = [
  {
    name: 'None',
    file: ''
  },
  {
    name: 'African Night',
    file: 'media/audio/background/African+night.mp3'
  },
  {
    name: 'Relaxing Sphere (Moby)',
    file: 'media/audio/background/01+LA1.mp3'
  },
  {
    name: 'Tropical Night',
    file: 'media/audio/background/01+Tropical+Night.mp3'
  },
  {
    name: 'Frogs',
    file: 'media/audio/background/10+Green-thighed+Frogs.mp3'
  },
]

export const ITEMS_TYPES = {
  text: 'text',
  audio: 'audio',
  picture: 'picture',
  movie: 'movie'
}