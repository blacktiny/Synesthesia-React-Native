import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  LOGIN_USER: null,

  IS_ID_NUMBER_EXISTED: null,
  ID_NUMBER_EXISTED: null,
  ID_NUMBER_NO_EXISTED: null,
  
  STORE_ID_NUMBER: null,

  GET_PROFILE_INFO: null,
  GET_PROFILE_INFO_SUCCESS: null,
  GET_PROFILE_INFO_FAIL: null,

  GET_LOCATION: null,
  GET_LOCATION_SUCCESS: null,
  GET_LOCATION_FAIL: null,
})

export const Theme = {
  primaryColor: "#fff",
  colorLightBrown: '#f6a723',
  colorLightGreen: '#c3d836',
  colorLightGreen2: '#c2d735',
  colorLightBlue: '#03badd',
  colorLightRed: '#f15b67',
  colorLigthRed2: '#da1f3d',
  colorLightGrey: '#8e8e93',
  colorWhite: 'white',
  colorBlack: 'black',

  FONT_REGULAR: 'Roboto-Regular',
  FONT_MEDIUM: 'Raleway-Medium',
  FONT_BOLD: 'Roboto-Bold'
}