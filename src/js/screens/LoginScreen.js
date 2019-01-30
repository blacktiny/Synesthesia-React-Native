import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Button, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';

import InputTextField from '../components/InputTextField';
import PasswordTextField from '../components/PasswordTextField';
import { Theme } from '../constants/constants'
import CustomButton from '../components/CustomButton'
import { iPhoneX } from '../../js/util';

import { loginUser } from '../actions/LoginAction'
import { closeLoginErrorBanner } from '../actions/LoginAction'
import { closeLoginSuccessBanner } from '../actions/LoginAction'

const { width, height } = Dimensions.get('screen');
const searchIcon = require('../../assets/google_icon.png')
import BannerCloseIcon from '../icons/BannerCloseIcon';
import ModalCloseIcon from '../icons/ModalCloseIcon';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      emailSuccessBorder: false,
      emailErrorBorder: false,
      password: '',
      passwordError: '',
      passwordSuccessBorder: false,
      passwordErrorBorder: false
    }
  }

  handleOnSubmit = () => {
    // event.preventDefault();
    // if (this.state.email != undefined && this.state.email != "" && this.state.password != undefined && this.state.password != "")
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

  loginErrorBanner = () => {
    return (
      <LinearGradient
        start={{ x: 0.98, y: 0.06 }} end={{ x: 0.03, y: 1.0 }}
        locations={[0, 1]}
        colors={['#7059ED', '#DA152C']}
        style={styles.loginBanner}>
        <TouchableOpacity style={styles.crossButton} onPress={() => {
          this.props.closeLoginErrorBanner();
          this.setState({
            email: '',
            password: '',
            emailSuccessBorder: false,
            passwordSuccessBorder: false
          })
        }}>
          <BannerCloseIcon style={styles.crossIcon} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={{ color: '#FFFFFF', fontSize: 19 }}>{'Ooops! :('}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10 }}>{'Login failed. Please try again.'}</Text>
        </View>
      </LinearGradient>
    )
  }

  loginSuccessBanner = () => {
    return (
      <LinearGradient
        start={{ x: 0.93, y: 0.14 }} end={{ x: 0, y: 1.0 }}
        locations={[0, 1]}
        colors={['#7059ED', '#00C2FB']}
        style={styles.loginBanner}>
        <TouchableOpacity style={styles.crossButton} onPress={() => {
          this.props.closeLoginSuccessBanner();
          this.props.navigation.navigate('Sensorium');
          this.setState({
            email: '',
            password: '',
            emailSuccessBorder: false,
            passwordSuccessBorder: false,
          })
        }}>
          <BannerCloseIcon style={styles.crossIcon} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={{ color: '#FFFFFF', fontSize: 19 }}>{'Yeah! :)'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10 }}>{'Login Successful!'}</Text>
        </View>
      </LinearGradient>
    )
  }

  loginForm = () => {
    const loginButtonDisabled = this.state.emailSuccessBorder && this.state.passwordSuccessBorder;
    let { requestPending } = this.props;
    return (
      <View style={styles.loginContent}>
        <TouchableOpacity style={styles.crossButton} onPress={() => alert('close')}>
          <ModalCloseIcon style={styles.crossIcon} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.loginText}>{'Login'}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.noAccountYet}>{'No account yet?'}<Text style={styles.createAccount}>{' Create an account'}</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginGoogleButton}>
            <Image style={styles.googleIcon} source={searchIcon} />
            <Text style={styles.loginGoogleText}>{'Login with google'}</Text>
          </TouchableOpacity>
          <Text style={[styles.loginGoogleText, { marginTop: 10, marginBottom: 10, fontSize: 15 }]}>{'or'}</Text>
        </View>
        <View>
          <Text style={styles.emailText}>{'Email'}</Text>
          <InputTextField
            onChange={(value) => {
              this.setState({
                email: value.trim()
              })
              this.validateEmail(value)
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
            <Text style={[styles.loginGoogleText, { color: '#25B999', marginTop: 13, fontFamily: Theme.FONT_MEDIUM }]}>{'Forgot password?'}</Text>
          </TouchableOpacity>
        </View>

        <Button title='Go to Sensorium' onPress={() => this.props.navigation.navigate('Sensorium')} />

      </View>

    )
  }

  render() {
    let { wrongCredentials, isLoggedIn } = this.props;
    return (
      <View style={styles.container}>
        {!wrongCredentials && !isLoggedIn && this.loginForm()}
        {!wrongCredentials && isLoggedIn && this.loginSuccessBanner()}
        {wrongCredentials && !isLoggedIn && this.loginErrorBanner()}
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
  checkBoxText: {
    color: '#777778',
    fontSize: 14,
  },
  loginGoogleText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 10,
    fontFamily: Theme.FONT_REGULAR
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
    paddingTop: 4,
    fontFamily: Theme.FONT_BOLD
  },
  noAccountYet: {
    color: '#FFFFFF',
    fontSize: 14,
    paddingTop: 15,
    fontFamily: Theme.FONT_MEDIUM
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
  loginContent: {
    height: iPhoneX() ? height - 340 : height - 190,
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

// const mapStateToProps = state => ({
//   isLoggedIn: state.isLoggedIn
// })
function mapStateToProps(state) {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    wrongCredentials: state.loginReducer.wrongCredentials,
    requestPending: state.loginReducer.requestPending
  }
}

// function mapDispatchToProps(dispatch) {
//   debugger;
//   return {
//     actions: bindActionCreators(loginActions, dispatch)
//   };
// }

const mapDispatchToProps = {
  loginUser,
  closeLoginErrorBanner,
  closeLoginSuccessBanner
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
