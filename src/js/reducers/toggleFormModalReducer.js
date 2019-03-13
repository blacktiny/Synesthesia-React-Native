import { ActionTypes } from '../constants/constants'

const initialState = {
  isLoginModalVisible: false,
  isRegisterModalVisible: false,
  isForgotPasswordModalVisible: false,
  isSuccessModalVisible: false,
  isErrorModalVisible: false,
  isPaymentDetailsModalVisible: false,
  subscriptionFlow: '',
  modalType: ''
};

export const toggleFormModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_MODAL_TYPE:
      return {
        ...state,
        modalType: action.payload.modalType
      }
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
        modalType: 'Register',
        subscriptionFlow: action.payload.subscriptionFlow
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
        isSuccessModalVisible: false,
        subscriptionFlow: ''
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
    case ActionTypes.OPEN_PAYMENT_DETAILS_MODAL:
      return {
        ...state,
        isPaymentDetailsModalVisible: true
      }
    case ActionTypes.CLOSE_PAYMENT_DETAILS_MODAL:
      return {
        ...state,
        isPaymentDetailsModalVisible: false
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