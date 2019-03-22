import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'

import InputTextField from '../components/InputTextField';
import PasswordTextField from '../components/PasswordTextField';
import { Theme } from '../constants/constants'
import CustomButton from '../components/CustomButton'
import { iPhoneX } from '../../js/util';

import { loginUser } from '../actions/LoginAction'
import { closeLoginModal, openRegisterModal, openForgotPasswordModal } from '../actions/ToggleFormModalAction'

const { width, height } = Dimensions.get('screen');
import ModalCloseIcon from '../icons/ModalCloseIcon';
import LoadingIndicator from '../components/LoadingIndicator'

const initialState = {
  email: '',
  emailError: '',
  emailSuccessBorder: false,
  emailErrorBorder: false,
  password: '',
  passwordError: '',
  passwordSuccessBorder: false,
  passwordErrorBorder: false,
}

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.wrongCredentials !== this.props.wrongCredentials) {
  //     this.clearForm();
  //   }
  // }

  handleOnSubmit = () => {
    let email = this.state.email;
    let password = this.state.password;
    this.props.loginUser({ email, password });
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

  validatePassword = (password) => {
    let error = '';
    if (password.trim() === '') {
      error = 'Must not be blank';
      this.setState({
        passwordErrorBorder: true,
        passwordSuccessBorder: false
      })
    } else {
      this.setState({
        passwordErrorBorder: false,
        passwordSuccessBorder: true
      })
    }
    this.setState({
      passwordError: error
    })
  }

  clearForm = () => {
    this.setState(initialState);
  }

  render() {
    let { requestPending } = this.props;
    const loginButtonDisabled = this.state.emailSuccessBorder && this.state.passwordSuccessBorder;
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
            {requestPending && <LoadingIndicator />}
            <View>
              <TouchableWithoutFeedback>
                <View>
                  <View style={styles.loginContent}>
                    <TouchableOpacity style={styles.crossButton} onPress={() => {
                      this.clearForm();
                      this.props.closeModal();
                    }}>
                      <ModalCloseIcon style={styles.crossIcon} color="#777778" />
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                      <Text style={styles.loginText}>{'Login'}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.closeLoginModal();
                          this.props.openRegisterModal();
                        }}>
                        <Text style={styles.noAccountYet}>{'Or'}<Text style={styles.createAccount}>{' Create an account'}</Text></Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={styles.emailText}>{'Email'}</Text>
                      <InputTextField
                        onChange={(value) => {
                          this.setState({
                            email: value.trim()
                          })
                        }}
                        value={this.state.email}
                        onBlur={() => this.validateEmail(this.state.email)}
                        error={this.state.emailError}
                        showSuccessBorder={this.state.emailSuccessBorder}
                        showErrorBorder={this.state.emailErrorBorder}
                      />
                      <View style={{ paddingTop: 10 }} />
                      <Text style={styles.emailText}>{'Password'}</Text>
                      <PasswordTextField
                        onChange={(value) => {
                          this.setState({ password: value.trim() })
                          this.validatePassword(value)
                        }}
                        onBlur={() => this.validatePassword(this.state.password)}
                        error={this.state.passwordError}
                        showSuccessBorder={this.state.passwordSuccessBorder}
                        showErrorBorder={this.state.passwordErrorBorder}
                      />
                    </View>
                    <View style={styles.buttonArea}>
                      <CustomButton
                        disabled={!loginButtonDisabled || requestPending}
                        title="Log in"
                        onPress={this.handleOnSubmit}
                      />
                      <TouchableOpacity onPress={() => {
                        this.props.closeLoginModal();
                        this.props.openForgotPasswordModal();
                      }}>
                        <Text style={[styles.loginGoogleText, { color: '#25B999', marginTop: 13, fontFamily: Theme.FONT_MEDIUM }]}>{'Forgot password?'}</Text>
                      </TouchableOpacity>
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
  buttonArea: {
    marginTop: 23,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emailText: {
    color: '#777778',
    fontSize: 15,
    fontFamily: Theme.FONT_MEDIUM
  },
  loginGoogleText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 10,
    fontFamily: Theme.FONT_REGULAR
  },
  crossIcon: {
    alignSelf: 'flex-end',
    marginRight: -12,
    marginTop: 10,
    resizeMode: 'contain'
  },
  createAccount: {
    color: '#25B999',
    fontSize: 14,
    paddingTop: 4,
    fontFamily: Theme.FONT_BOLD
  },
  noAccountYet: {
    color: '#FFFFFF',
    fontSize: 14,
    paddingTop: 15,
    fontFamily: Theme.FONT_BOLD
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
  loginContent: {
    height: iPhoneX() ? height - 420 : height - 250,
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
  loginUser,
  closeLoginModal,
  openRegisterModal,
  openForgotPasswordModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal)
