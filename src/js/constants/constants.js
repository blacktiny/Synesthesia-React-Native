import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  LOGIN_USER: null,
  LOGIN_USER_SUCCESS: null,
  LOGIN_USER_FAIL: null,

  CLOSE_LOGIN_BANNER_ERROR: null,
  CLOSE_REGISTER_ERROR_BANNER: null,
  CLOSE_SEND_RESET_LINK_ERROR_BANNER: null,

  SEND_RESET_LINK: null,
  SEND_RESET_LINK_SUCCESS: null,
  SEND_RESET_LINK_FAIL: null,

  REGISTER_USER: null,
  REGISTER_USER_SUCCESS: null,
  REGISTER_USER_FAIL: null,

  AUTH: null,
  AUTH_SUCCESS: null,
  AUTH_FAIL: null,

  LOGOUT_USER: null,
  LOGOUT_USER_SUCCESS: null,
  LOGOUT_USER_FAIL: null,

  GET_SYNESTHESIA: null,
  GET_SYNESTHESIA_SUCCESS: null,
  GET_SYNESTHESIA_FAIL: null,

  GET_MINDFULNESS: null,
  GET_MINDFULNESS_SUCCESS: null,
  GET_MINDFULNESS_FAIL: null,

  GET_NODE: null,
  GET_NODE_SUCCESS: null,
  GET_NODE_FAIL: null,
  
  CLEAR_NODE: null,
  
})

export const Theme = {
  COLOR_1: '#ee1528',
  COLOR_2: '#f2f2f2',
  COLOR_3: '#0B0B0B',
  COLOR_4: '#09ACE8',
  // FONT_REGULAR: '"Raleway-Regular", sans-serif',
  // FONT_BOLD: '"Raleway-Regular", sans-serif'
}