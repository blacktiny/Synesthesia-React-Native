import { ActionTypes } from '../constants/constants'

const initialState = {
  isLoginModalVisible: false,
  isRegisterModalVisible: false,
  isForgotPasswordModalVisible: false,
  isSuccessModalVisible: false,
  isErrorModalVisible: false,
  modalType: ''
};

export const toggleFormModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.OPEN_LOGIN_MODAL:
      return {
        ...state,
        isLoginModalVisible: true,
        modalType: 'LogIn'
      }
    case ActionTypes.CLOSE_LOGIN_MODAL:
      return {
        ...state,
        isLoginModalVisible: false,
      }
    case ActionTypes.OPEN_REGISTER_MODAL:
      return {
        ...state,
        isRegisterModalVisible: true,
        modalType: 'Register'
      }
    case ActionTypes.CLOSE_REGISTER_MODAL:
      return {
        ...state,
        isRegisterModalVisible: false
      }
    case ActionTypes.OPEN_SUCCESS_MODAL:
      return {
        ...state,
        isLoginModalVisible: false,
        isRegisterModalVisible: false,
        isSuccessModalVisible: false,
        isForgotPasswordModalVisible: false,
        isSuccessModalVisible: true,
      }
    case ActionTypes.CLOSE_SUCCESS_MODAL:
      return {
        ...state,
        isSuccessModalVisible: false
      }
    case ActionTypes.OPEN_ERROR_MODAL:
      return {
        ...state,
        isLoginModalVisible: false,
        isRegisterModalVisible: false,
        isSuccessModalVisible: false,
        isForgotPasswordModalVisible: false,
        isErrorModalVisible: true,
      }
    case ActionTypes.CLOSE_ERROR_MODAL:
      return {
        ...state,
        isErrorModalVisible: false
      }
    case ActionTypes.OPEN_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        isForgotPasswordModalVisible: true,
        modalType: 'ForgotPassword'
      }
    case ActionTypes.CLOSE_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        isForgotPasswordModalVisible: false
      }
    case ActionTypes.UPDATE_USER_FORM:
      return {
        ...state,
        modalType: 'UpdateUser'
      }
    default:
      return state
  }
}