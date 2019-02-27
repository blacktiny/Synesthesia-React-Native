import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';

import InputTextField from '../components/InputTextField';
import PasswordTextField from '../components/PasswordTextField';
import { Theme } from '../constants/constants'
import CustomButton from '../components/CustomButton'
import { iPhoneX } from '../../js/util';

import { loginUser, isLoggedInUser } from '../actions/LoginAction'
import { closeLoginErrorBanner } from '../actions/LoginAction'
import { closeLoginSuccessBanner } from '../actions/LoginAction'
import { cleanSynesthesia } from '../actions/SynesthesiaAction'
import { cleanMindFulness } from '../actions/MindFulnessAction'
import { cleanAwareness } from '../actions/BeingAwareAction'
import { cleanProgress } from '../actions/ProgressAction'
import { setHeaderItem } from '../actions/MeditateHeaderAction'

const { width, height } = Dimensions.get('screen');
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

  componentDidMount() {
    this.props.isLoggedInUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.bGotoMainScreen)
      this.gotoMainScreen();
    if (this.props.isLoggedIn)
      this.cleanSensorium();
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
          <BannerCloseIcon style={styles.crossIcon} color="#AC9FF4" />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Ooops! :('}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Login failed. Please try again.'}</Text>
        </View>
      </LinearGradient>
    )
  }

  cleanSensorium = () => {
    this.props.cleanSynesthesia();
    this.props.cleanMindFulness();
    this.props.cleanAwareness();
    this.props.cleanProgress();
    this.props.setHeaderItem('Sensorium');
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
          <BannerCloseIcon style={styles.crossIcon} color="#AC9FF4" />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Yeah! :)'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Login Successful!'}</Text>
        </View>
      </LinearGradient>
    )
  }

  loginForm = () => {
    const loginButtonDisabled = this.state.emailSuccessBorder && this.state.passwordSuccessBorder;
    let { requestPending } = this.props;
    return (
      <View style={styles.loginContent}>
        <TouchableOpacity style={styles.crossButton} onPress={() => this.props.navigation.navigate('Sensorium')}>
          <ModalCloseIcon style={styles.crossIcon} color="#777778" />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.loginText}>{'Login'}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.noAccountYet}>{'No account yet?'}<Text style={styles.createAccount}>{' Create an account'}</Text></Text>
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
            <Text style={[styles.loginGoogleText, { color: '#25B999', marginTop: 13, fontFamily: Theme.FONT_MEDIUM }]}>{'Forgot password?'}</Text>
          </TouchableOpacity>
        </View>

      </View>

    )
  }

  gotoMainScreen = () => {
    this.props.navigation.navigate('Sensorium');
  }

  loadingPage = () => {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  render() {
    let { isCheckingLoggedIn, wrongCredentials, isLoggedIn } = this.props;
    return (
      <View style={styles.container}>
        {isCheckingLoggedIn && this.loadingPage()}
        {!isCheckingLoggedIn && !wrongCredentials && !isLoggedIn && this.loginForm()}
        {!isCheckingLoggedIn && !wrongCredentials && isLoggedIn && this.loginSuccessBanner()}
        {!isCheckingLoggedIn && wrongCredentials && !isLoggedIn && this.loginErrorBanner()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    bGotoMainScreen: state.loginReducer.bGotoMainScreen,
    isCheckingLoggedIn: state.loginReducer.isCheckingLoggedIn,
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
  cleanSynesthesia,
  cleanMindFulness,
  cleanAwareness,
  cleanProgress,
  setHeaderItem,
  isLoggedInUser,
  loginUser,
  closeLoginErrorBanner,
  closeLoginSuccessBanner
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
