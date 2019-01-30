import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import InputTextField from '../components/InputTextField';
import PasswordTextField from '../components/PasswordTextField';
import CustomButton from '../components/CustomButton';
import CustomCheckBox from '../components/CustomCheckBox';

import { connect } from 'react-redux'

import { registerUser } from '../actions/RegisterAction'
import { closeRegisterErrorBanner } from '../actions/RegisterAction'

const { width, height } = Dimensions.get('window');
const searchIcon = require('../../assets/google_icon.png');
import ModalCloseIcon from '../icons/ModalCloseIcon';


class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: 0,
      isChecked1: false,
      isChecked2: false,
      userName: '',
      userNameError: '',
      userNameSuccessBorder: false,
      userNameErrorBorder: false,
      email: '',
      emailError: '',
      emailSuccessBorder: false,
      emailErrorBorder: false,
      password: '',
      passwordError: '',
      passwordSuccessBorder: false,
      passwordErrorBorder: false,
      confirmPassword: '',
      confirmPasswordError: '',
      confirmPasswordSuccessBorder: false,
      confirmPasswordErrorBorder: false
    }
  }

  validateUserName = (userName) => {
    let error = '';
    if (userName.trim() === '') {
      error = 'Must not be blank';
      this.setState({
        userNameErrorBorder: true,
        userNameSuccessBorder: false
      })
    } else {
      this.setState({
        userNameErrorBorder: false,
        userNameSuccessBorder: true
      })
    }
    this.setState({
      userNameError: error
    })
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

    if (this.state.confirmPassword !== '' && this.state.confirmPassword !== password) {
      error = 'Wrong password!';
      this.setState({
        passwordErrorBorder: true,
        passwordSuccessBorder: false
      })
    }

    this.setState({
      passwordError: error
    })
  }

  validateConfirmPassword = (confirmPassword) => {
    let error = '';
    if (confirmPassword.trim() === '') {
      error = 'Must not be blank';
      this.setState({
        confirmPasswordErrorBorder: true,
        confirmPasswordSuccessBorder: false
      })
    } else {
      this.setState({
        confirmPasswordErrorBorder: false,
        confirmPasswordSuccessBorder: true
      })
    }

    if (this.state.password !== confirmPassword) {
      error = 'Wrong password!';
      this.setState({
        confirmPasswordErrorBorder: true,
        confirmPasswordSuccessBorder: false
      })
    }

    this.setState({
      confirmPasswordError: error
    })
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  }

  createAccount = () => {
    // const scrollEnabled = this.state.screenHeight > height;
    const registerButtonDisabled = this.state.userNameSuccessBorder && this.state.emailSuccessBorder &&
      this.state.passwordSuccessBorder && this.state.confirmPasswordSuccessBorder &&
      this.state.isChecked1 && this.state.isChecked2;
    return (
      <View style={styles.createContent}>
        <TouchableOpacity style={styles.crossButton} onPress={() => alert('hiiiii')}>
          <ModalCloseIcon style={styles.crossIcon} />
        </TouchableOpacity>
        <ScrollView
          style={{ flex: 1, marginBottom: 15 }}
          scrollEnabled={true}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View style={styles.textContainer}>
            <Text style={styles.loginText}>{'Create a free account'}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.noAccountYet}>{'Already have an account?'}<Text style={styles.createAccount}>{' Log in'}</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginGoogleButton}>
              <Image style={styles.googleIcon} source={searchIcon} />
              <Text style={styles.loginGoogleText}>{'Sign up with Google'}</Text>
            </TouchableOpacity>
            <Text style={[styles.loginGoogleText, { marginTop: 10, marginBottom: 10, fontSize: 15 }]}>or</Text>
          </View>
          <View>
            <Text style={styles.emailText}>{'Username'}</Text>
            <InputTextField
              onChange={(value) => {
                this.setState({ userName: value.trim() })
                this.validateUserName(value)
              }}
              onBlur={() => this.validateUserName(this.state.userName)}
              error={this.state.userNameError}
              showSuccessBorder={this.state.userNameSuccessBorder}
              showErrorBorder={this.state.userNameErrorBorder}
            />
            <View style={{ paddingTop: 10 }} />
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
            <View style={{ paddingTop: 10 }} />
            <Text style={styles.emailText}>{'Confirm Password'}</Text>
            <PasswordTextField
              onChange={(value) => {
                this.setState({ confirmPassword: value.trim() })
                this.validateConfirmPassword(value)
              }}
              onBlur={() => this.validateConfirmPassword(this.state.confirmPassword)}
              error={this.state.confirmPasswordError}
              showSuccessBorder={this.state.confirmPasswordSuccessBorder}
              showErrorBorder={this.state.confirmPasswordErrorBorder}
            />
            <CustomCheckBox
              size={30}
              checked={this.state.isChecked1}
              onClickCustomCheckbox={() => {
                this.setState({
                  isChecked1: !this.state.isChecked1
                })
              }}
              label={<Text style={styles.checkBoxText}>{'By signing up you agree on the'}<Text style={[styles.checkBoxText, { color: '#25B999' }]}>{' Terms & Conditions'}</Text><Text style={styles.checkBoxText}>{' and'}</Text><Text style={[styles.checkBoxText, { color: '#25B999' }]}>{' Privacy Policy'}</Text><Text style={styles.checkBoxText}>{' of synesthesia.com'}</Text></Text>}
            />
            <View style={{ paddingTop: 10 }} />
            <CustomCheckBox
              size={30}
              checked={this.state.isChecked2}
              onClickCustomCheckbox={() => {
                this.setState({
                  isChecked2: !this.state.isChecked2
                })
              }}
              label={<Text style={styles.checkBoxText}>{'I want to receive informative emails on Synesthesia and Meditation'}</Text>}
            />

            <View style={[styles.buttonArea, { marginTop: 20 }]}>
              <CustomButton
                disabled={!registerButtonDisabled}
                title="Create account"
              />
            </View>
          </View>
        </ScrollView>

      </View>
    );
  }

  resetPassword = () => {
    return (
      <View style={styles.resetPasswordContent}>
        <TouchableOpacity style={styles.crossButton} onPress={() => alert('hiiiii')}>
          <ModalCloseIcon tyle={styles.crossIcon} />
        </TouchableOpacity>
        <View style={[styles.textContainer, { paddingLeft: 25, paddingRight: 25, paddingTop: 20, flexWrap: 'wrap' }]}>
          <Text style={styles.loginText}>{'Reset Password'}</Text>
          <Text style={[styles.noAccountYet, { textAlign: 'center', letterSpacing: .5 }]}>{'Type your new password and sign in'}</Text>
        </View>
        <View style={styles.spacer} />
        <View>
          <Text style={styles.emailText}>{'Password'}</Text>
          <View style={styles.spacer} />
          <InputTextField
            onChange={() => console.log('hiiii')}
            onBlur={() => console.log('hiiii')}
            showSuccessBorder={false}
          />
        </View>
        <View style={styles.spacer} />
        <View>
          <Text style={styles.emailText}>{'Confirm Password'}</Text>
          <View style={styles.spacer} />
          <InputTextField
            onChange={() => console.log('hiiii')}
            onBlur={() => console.log('hiiii')}
            showSuccessBorder={false}
          />
        </View>
        <View style={styles.resetLinkButton}>
          <CustomButton
            title="Resend Link"
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.createAccount()}
        {/* {!this.state.showForgot && !this.state.showReset && !this.state.showCreateAccount && this.loginContent()} */}
        {/* {this.state.showForgot && this.forgotPassword()}
        {this.state.showReset && this.resetPassword()}
        {this.state.showCreateAccount && this.createAccount()} */}
      </View>
    );
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
  buttonArea: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resetLinkButton: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spacer: {
    marginTop: 10,
  },
  emailText: {
    color: '#777778',
    fontSize: 15,
  },
  checkBoxText: {
    color: '#777778',
    fontSize: 14,
  },
  loginGoogleText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 10
  },
  googleIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  crossIcon: {
    alignSelf: 'flex-end',
    marginRight: -12,
    marginTop: 10,
    resizeMode: 'contain'
  },
  loginGoogleButton: {
    borderRadius: 20,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    height: 45,
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  createAccount: {
    color: '#25B999',
    fontSize: 14,
    paddingTop: 4
  },
  noAccountYet: {
    color: '#FFFFFF',
    fontSize: 14,
    paddingTop: 4
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20
  },
  textContainer: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  crossButton: {
    paddingRight: 8,
    paddingTop: 5
  },
  loginContent: {
    height: height - 150,
    width: width - 30,
    backgroundColor: '#3D3D3E',
    borderRadius: 20,
    borderColor: '#3D3D3E',
    borderWidth: 1
  },
  createContent: {
    height: height - 80,
    width: width - 30,
    backgroundColor: '#3D3D3E',
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderColor: '#3D3D3E',
    borderWidth: 1
  },
  resetPasswordContent: {
    height: height - 300,
    width: width - 30,
    backgroundColor: '#3D3D3E',
    borderRadius: 20,
    borderColor: '#3D3D3E',
    borderWidth: 1
  }
});

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    wrongCredentials: state.loginReducer.wrongCredentials
  }
}

const mapDispatchToProps = {
  registerUser,
  closeRegisterErrorBanner
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen)

