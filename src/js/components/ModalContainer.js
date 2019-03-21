import React, {Component} from 'react'
import LoginModal from '../components/LoginModal';
import { connect } from 'react-redux'

import RegisterModal from '../components/RegisterModal';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import PaymentDetailsModal from '../components/PaymentDetailsModal';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';
import NavigationService from '../helpers/navigationService'
import {
  openLoginModal,
  closeLoginModal,
  closeRegisterModal,
  closeForgotPasswordModal,
  closeSuccessModal,
  closeErrorModal,
  openRegisterModal,
  openForgotPasswordModal,
  closePaymentDetailsModal
} from '../actions/ToggleFormModalAction'
import { setMenuItem } from '../../js/actions/SideMenuAction';
import { removeBlur } from '../actions/BlurAction'

class ModalContainer extends Component {
  render() {
    const {
      isLoginModalVisible, isRegisterModalVisible, isForgotPasswordModalVisible, isPaymentDetailsModalVisible,
      isSuccessModalVisible, isErrorModalVisible, modalType, subscriptionFlow } = this.props;
    return [
        <LoginModal
          key={1}
          modalVisible={isLoginModalVisible}
          closeModal={() => { this.props.dispatch(closeLoginModal()); this.props.dispatch(removeBlur()) }}
        />,
        <RegisterModal
          key={2}
          modalVisible={isRegisterModalVisible}
          closeModal={() => { this.props.dispatch(closeRegisterModal()); this.props.dispatch(removeBlur()) }}
        />,
        <ForgotPasswordModal
          key={3}
          modalVisible={isForgotPasswordModalVisible}
          closeModal={() => { this.props.dispatch(closeForgotPasswordModal()); this.props.dispatch(removeBlur()) }}
        />,
        <SuccessModal
          key={4}
          modalVisible={isSuccessModalVisible}
          modalType={modalType}
          closeModal={() => { 
            if (subscriptionFlow !== '') {
              NavigationService.navigate('ConfirmMonthlySubscribe', { tier: subscriptionFlow });
              this.props.dispatch(setMenuItem('My account'));
            } else {
              NavigationService.goBack('Sensorium');
            }
            this.props.dispatch(closeSuccessModal());
            this.props.dispatch(removeBlur())
          }}
        />,
        <ErrorModal
          key={5}
          modalVisible={isErrorModalVisible}
          modalType={modalType}
          closeModal={() => {
            this.props.dispatch(closeErrorModal());
            if (modalType === "LogIn") {
              this.props.dispatch(openLoginModal());
            } else if (modalType === "Register") {
              this.props.dispatch(openRegisterModal());
            } else if (modalType === "ForgotPassword") {
              this.props.dispatch(openForgotPasswordModal());
            } else if (modalType === "LogOut") {
              this.props.dispatch(openLoginModal());
            } else {
              this.props.dispatch(removeBlur())
            }
          }}
        />,

        <PaymentDetailsModal
          key={6}
          modalVisible={isPaymentDetailsModalVisible}
          closeModal={() => { this.props.dispatch(closePaymentDetailsModal()); this.props.dispatch(removeBlur()) }}
        />
    ]
  }
}
function mapStateToProps(state) {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    user: state.loginReducer.user,
    userType: state.loginReducer.user.user_type || '-1',
    currentItem: state.sidemenuReducer.currentItem,
    isLoginModalVisible: state.toggleFormModalReducer.isLoginModalVisible,
    isRegisterModalVisible: state.toggleFormModalReducer.isRegisterModalVisible,
    isForgotPasswordModalVisible: state.toggleFormModalReducer.isForgotPasswordModalVisible,
    isPaymentDetailsModalVisible: state.toggleFormModalReducer.isPaymentDetailsModalVisible,
    isSuccessModalVisible: state.toggleFormModalReducer.isSuccessModalVisible,
    isErrorModalVisible: state.toggleFormModalReducer.isErrorModalVisible,
    subscriptionFlow: state.toggleFormModalReducer.subscriptionFlow,
    modalType: state.toggleFormModalReducer.modalType
  }
}

export default connect(mapStateToProps)(ModalContainer);
