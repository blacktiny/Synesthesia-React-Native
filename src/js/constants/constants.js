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
  UPDATE_USER_FORM: null,

  SET_MODAL_TYPE: null,

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

  ADD_BLUR: null,
  REMOVE_BLUR: null,

  GET_BOTTOM_BAR_ITEM: null,
  SET_BOTTOM_BAR_ITEM: null,
  TOGGLE_BOTTOM_BAR: null,
  
  OPEN_PAYMENT_DETAILS_MODAL: null,
  CLOSE_PAYMENT_DETAILS_MODAL: null,

  SET_SUBSCRIPTION_TYPE: null,
  SET_SUBSCRIPTION_TYPE_SUCCESS: null,

  SET_USER_TOGGLE_TYPE: null
})

export const Theme = {
  // FONT_LIGHT: 'RawlineLight-Regular',
  // FONT_REGULAR: 'Rawline-Regular',
  // FONT_MEDIUM: 'RawlineMedium-Regular',
  // FONT_SEMIBOLD: 'RawlineSemiBold-Regular',
  // FONT_BOLD: 'Rawline-Bold'
  FONT_LIGHT: 'Raleway-Light',
  FONT_REGULAR: 'Raleway-Regular',
  FONT_MEDIUM: 'Raleway-Medium',
  FONT_SEMIBOLD: 'Raleway-SemiBold',
  FONT_BOLD: 'Raleway-Bold'
}

export const FILES_URL = 'https://s3-us-west-2.amazonaws.com/synesthesia-files/'

export const BACKGROUND_SOUNDS = [
  {
    id: 0,
    name: 'None',
    file: ''
  },
  {
    id: 1,
    name: 'Tropical Night (Listening Earth)',
    file: 'media/audio/background/01+Tropical+Night.mp3'
  },
  {
    id: 2,
    name: 'African Savannah (L. Earth)',
    file: 'media/audio/background/African+night.mp3'
  },
  {
    id: 3,
    name: 'Coral Beach (Listening Earth)',
    file: 'media/audio/background/01+Coral+Beach.mp3'
  },
  {
    id: 4,
    name: '"Open Water" (Sirius)',
    file: 'media/audio/background/236_full_open-water_1103.mp3'
  },
  {
    id: 5,
    name: '"Timescape" (Sirius)',
    file: 'media/audio/background/236_full_timescape_1122.mp3'
  },
  {
    id: 6,
    name: '"Rock Formation" (Sirius)',
    file: 'media/audio/background/236_full_rock-formations_1089.mp3'
  },
  {
    id: 7,
    name: '"Peace Garden" (Sirius)',
    file: 'media/audio/background/236_full_peace-garden_1059.mp3'
  },
  {
    id: 8,
    name: '"Meteors" (Sirius)',
    file: 'media/audio/background/236_full_meteors_1064.mp3'
  },
  {
    id: 9,
    name: 'LA 1 (Moby)',
    file: 'media/audio/background/01+LA1.mp3'
  },
  {
    id: 10,
    name: 'LA 4 (Moby)',
    file: 'media/audio/background/04+LA4.mp3'
  },
  {
    id: 11,
    name: 'LA 7 (Moby)',
    file: 'media/audio/background/07+LA7.mp3'
  },
  {
    id: 12,
    name: 'LA 11 (Moby)',
    file: 'media/audio/background/11+LA11.mp3'
  },
  {
    id: 13,
    name: 'Birch Wood (Listening Earth)',
    file: 'media/audio/background/02+Birch+Wood,+part+2.mp3'
  },
  {
    id: 14,
    name: 'African Woodland (L.Earth)',
    file: 'media/audio/background/03+African+Woodland+with+Impalas+Grazing.mp3'
  },
  {
    id: 15,
    name: 'Himalaya (Listening Earth)',
    file: 'media/audio/background/07+The+Karka+Meadow.mp3'
  },
  {
    id: 16,
    name: 'Redwoods (Listening Earth)',
    file: 'media/audio/background/03+Dewfall,+with+Ravens+and+Barred+Owl.mp3'
  },
  {
    id: 17,
    name: '"Whale Serenade" (Clarke)',
    file: 'media/audio/background/whale_serenade.mp3'
  },
  {
    id: 18,
    name: '"Earth Embrace" (Clarke)',
    file: 'media/audio/background/01+Earths+Embrace.mp3'
  },
  {
    id: 19,
    name: '"Ohm Mantra" (Clarke)',
    file: 'media/audio/background/ohm_mantra.mp3'
  },
  {
    id: 20,
    name: 'Torrential Rain',
    file: 'media/audio/background/Torrential_Rain.mp3'
  },
  {
    id: 21,
    name: 'Waterfall',
    file: 'media/audio/background/Waterfall.mp3'
  },
  {
    id: 22,
    name: 'Tropical Storm',
    file: 'media/audio/background/Tropical+storm.mp3'
  }
]

export const ITEMS_TYPES = {
  text: 'text',
  audio: 'audio',
  picture: 'picture',
  movie: 'movie'
}