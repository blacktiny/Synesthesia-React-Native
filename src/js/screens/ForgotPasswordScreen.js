import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';

import InputTextField from '../components/InputTextField';
import { Theme } from '../constants/constants'
import CustomButton from '../components/CustomButton'

import { sendResetLink } from '../actions/ForgotPasswordAction'
import { closeSendResetLinkErrorBanner } from '../actions/ForgotPasswordAction'
import { closeSendResetLinkSuccessBanner } from '../actions/ForgotPasswordAction'

import { iPhoneX } from '../../js/util';

const { width, height } = Dimensions.get('screen');
import ModalCloseIcon from '../icons/ModalCloseIcon';
import BannerCloseIcon from '../icons/BannerCloseIcon';

class ForgotPasswordScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: '',
      emailSuccessBorder: false,
      emailErrorBorder: false,
    };
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

  sendResetLinkErrorBanner = () => {
    return (
      <LinearGradient
        start={{ x: 0.98, y: 0.06 }} end={{ x: 0.03, y: 1.0 }}
        locations={[0, 1]}
        colors={['#7059ED', '#DA152C']}
        style={styles.loginBanner}>
        <TouchableOpacity style={styles.crossButton} onPress={() => {
          this.props.closeSendResetLinkErrorBanner();
          this.setState({
            email: '',
            emailSuccessBorder: false
          })
        }}>
          <BannerCloseIcon style={styles.crossIcon} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={{ color: '#FFFFFF', fontSize: 19 }}>{'Ooops! :('}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10 }}>{'Reset link not sent.'}</Text>
        </View>
      </LinearGradient>
    )
  }

  sendResetLinkSuccessBanner = () => {
    return (
      <LinearGradient
        start={{ x: 0.93, y: 0.14 }} end={{ x: 0, y: 1.0 }}
        locations={[0, 1]}
        colors={['#7059ED', '#00C2FB']}
        style={styles.loginBanner}>
        <TouchableOpacity style={styles.crossButton}
          onPress={() => {
            this.props.closeSendResetLinkSuccessBanner();
            this.props.navigation.navigate('Login');
            this.setState({
              email: '',
              emailSuccessBorder: false
            })
          }}>
          <BannerCloseIcon style={styles.crossIcon} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={{ color: '#FFFFFF', fontSize: 19 }}>{'Yeah! :)'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10 }}>{'Reset code sent!'}</Text>
        </View>
      </LinearGradient>
    )
  }

  forgotPasswordForm = () => {
    const resetLinkButtonDisabled = this.state.emailSuccessBorder;
    let { requestPending } = this.props;
    return (
      <View style={styles.container}>

        <View style={styles.forgotPasswordContent}>
          <TouchableOpacity style={styles.crossButton} onPress={() => this.props.navigation.navigate('Login')}>
            <ModalCloseIcon style={styles.crossIcon} />
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
    )
  }

  render() {
    let { codeSent, userNotFound } = this.props;
    return (
      <View style={styles.container}>
        {!codeSent && !userNotFound && this.forgotPasswordForm()}
        {codeSent && !userNotFound && this.sendResetLinkSuccessBanner()}
        {!codeSent && userNotFound && this.sendResetLinkErrorBanner()}
      </View>
    )

  }
}

function mapStateToProps(state) {
  return {
    codeSent: state.forgotPasswordReducer.codeSent,
    userNotFound: state.forgotPasswordReducer.userNotFound,
    requestPending: state.forgotPasswordReducer.requestPending
  }
}

const mapDispatchToProps = {
  sendResetLink,
  closeSendResetLinkErrorBanner,
  closeSendResetLinkSuccessBanner
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  buttonArea: {
    justifyContent: 'center',
    alignItems: 'center'
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
    alignItems: 'center'
  },
  crossButton: {
    paddingRight: 8,
    paddingTop: 5
  },
  forgotPasswordContent: {
    height: iPhoneX() ? height - 500 : height - 350,
    width: width - 30,
    backgroundColor: '#3D3D3E',
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderColor: '#3D3D3E',
    borderWidth: 1
  },
  loginBanner: {
    height: height - 685,
    width: width - 30,
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 1
  }
});


