import { ActionTypes } from '../constants/constants'

export function setModalType(modalType) {
  return {
    type: ActionTypes.SET_MODAL_TYPE,
    payload: {
      modalType
    }
  }
}

export function openLoginModal() {
  return {
    type: ActionTypes.OPEN_LOGIN_MODAL,
    payload: {}
  }
}

export function closeLoginModal() {
  return {
    type: ActionTypes.CLOSE_LOGIN_MODAL,
    payload: {}
  }
}

export function openRegisterModal(subscriptionFlow = '') {
  return {
    type: ActionTypes.OPEN_REGISTER_MODAL,
    payload: {
      subscriptionFlow
    }
  }
}

export function closeRegisterModal() {
  return {
    type: ActionTypes.CLOSE_REGISTER_MODAL,
    payload: {}
  }
}

export function openForgotPasswordModal() {
  return {
    type: ActionTypes.OPEN_FORGOT_PASSWORD_MODAL,
    payload: {}
  }
}

export function closeForgotPasswordModal() {
  return {
    type: ActionTypes.CLOSE_FORGOT_PASSWORD_MODAL,
    payload: {}
  }
}

export function closeSuccessModal() {
  return {
    type: ActionTypes.CLOSE_SUCCESS_MODAL,
    payload: {}
  }
}

export function closeErrorModal() {
  return {
    type: ActionTypes.CLOSE_ERROR_MODAL,
    payload: {}
  }
}

export function openPaymentDetailsModal() {
  return {
    type: ActionTypes.OPEN_PAYMENT_DETAILS_MODAL,
    payload: {}
  }
}

export function closePaymentDetailsModal() {
  return {
    type: ActionTypes.CLOSE_PAYMENT_DETAILS_MODAL,
    payload: {}
  }
}