import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'

import InputTextField from '../components/InputTextField';
import { Theme } from '../constants/constants'
import CustomButton from '../components/CustomButton'
import { iPhoneX } from '../../js/util';

import { sendResetLink } from '../actions/ForgotPasswordAction'

const { width, height } = Dimensions.get('screen');
import ModalCloseIcon from '../icons/ModalCloseIcon';

const initialState = {
  email: '',
  emailError: '',
  emailSuccessBorder: false,
  emailErrorBorder: false,
}

class ForgotPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleOnSubmit = () => {
    let email = this.state.email;
    this.props.sendResetLink({ email });
  }

  validateEmailRegex = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  validateEmail = (email) => {
    let error = '';
    if (email.trim() === '') {
      error = 'Must not be blank';
      this.setState({
        emailErrorBorder: true,
        emailSuccessBorder: false
      })
    } else if (email) {
      if (!this.validateEmailRegex(email)) {
        error = 'Please enter valid email';
        this.setState({
          emailErrorBorder: true,
          emailSuccessBorder: false
        })
      } else {
        this.setState({
          emailErrorBorder: false,
          emailSuccessBorder: true
        })
      }
    }
    this.setState({
      emailError: error
    })
  }

  clearForm = () => {
    this.setState(initialState);
  }

  render() {
    let { requestPending } = this.props;
    const resetLinkButtonDisabled = this.state.emailSuccessBorder;
    return (
      <View>

        <Modal
          visible={this.props.modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => console.log('closed')}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPressOut={() => { this.props.closeModal(); }}
          >
            <View>
              <TouchableWithoutFeedback>
                <View>
                  <View style={styles.forgotPasswordContent}>
                    <TouchableOpacity style={styles.crossButton} onPress={() => {
                      this.clearForm();
                      this.props.closeModal();
                    }}>
                      <ModalCloseIcon style={styles.crossIcon} color="#777778" />
                    </TouchableOpacity>
                    <View style={[styles.textContainer, { paddingLeft: 25, paddingRight: 25, paddingTop: 20, flexWrap: 'wrap' }]}>
                      <Text style={styles.loginText}>{'Forgot Password'}</Text>
                      <Text style={[styles.noAccountYet, { textAlign: 'center', letterSpacing: .5 }]}>{'Submit your email address and we will send you link to reset your password'}</Text>
                    </View>
                    <View style={styles.spacer} />
                    <View>
                      <Text style={styles.emailText}>{'Email'}</Text>
                      <InputTextField
                        onChange={(value) => {
                          this.setState({ email: value.trim() })
                          this.validateEmail(value)
                        }}
                        onBlur={() => this.validateEmail(this.state.email)}
                        error={this.state.emailError}
                        showSuccessBorder={this.state.emailSuccessBorder}
                        showErrorBorder={this.state.emailErrorBorder}
                      />
                    </View>
                    <View style={styles.resetLinkButton}>
                      <CustomButton
                        title="Send reset link"
                        disabled={!resetLinkButtonDisabled || requestPending}
                        onPress={this.handleOnSubmit}
                      />
                    </View>
                  </View>

                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableOpacity>
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  resetLinkButton: {
    marginTop: 23,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spacer: {
    marginTop: 10,
  },
  emailText: {
    color: '#777778',
    fontSize: 15,
    fontFamily: Theme.FONT_MEDIUM
  },
  crossIcon: {
    alignSelf: 'flex-end',
    marginRight: -12,
    marginTop: 10,
    resizeMode: 'contain'
  },
  noAccountYet: {
    color: '#FFFFFF',
    fontSize: 14,
    paddingTop: 4,
    fontFamily: Theme.FONT_REGULAR
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: Theme.FONT_BOLD
  },
  textContainer: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  crossButton: {
    paddingRight: 8,
    paddingTop: 5
  },
  forgotPasswordContent: {
    height: iPhoneX() ? height - 460 : height - 310,
    width: width - 30,
    backgroundColor: '#3D3D3E',
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderColor: '#3D3D3E',
    borderWidth: 1
  },
  modalContainer: {
    height: '100%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '2.5%',
    top: 0,
    flexDirection: 'row'
  },
});

// const mapStateToProps = state => ({
//   isLoggedIn: state.isLoggedIn
// })
function mapStateToProps(state) {
  return {
    requestPending: state.loginReducer.requestPending
  }
}

const mapDispatchToProps = {
  sendResetLink,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordModal)
