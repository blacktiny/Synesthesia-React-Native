import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, Linking, TouchableOpacity, Platform } from 'react-native';
import InputTextField from '../components/InputTextField';
import PasswordTextField from '../components/PasswordTextField';
import CustomButton from '../components/CustomButton';
import CustomCheckBox from '../components/CustomCheckBox';

import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import { Theme } from '../constants/constants'

import { registerUser } from '../actions/RegisterAction'
import { closeRegisterErrorBanner } from '../actions/RegisterAction'
import { closeRegisterSuccessBanner } from '../actions/RegisterAction'
import { setHeaderItem } from '../actions/MeditateHeaderAction'

const { width, height } = Dimensions.get('window');
import ModalCloseIcon from '../icons/ModalCloseIcon';
import BannerCloseIcon from '../icons/BannerCloseIcon';

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
      passwordErrorBorder: false
    }
  }

  handleOnSubmit = () => {
    let name = this.state.userName;
    let email = this.state.email;
    let password = this.state.password;
    let first_name = "";
    let last_name = "";
    let user_type_id = "1";
    this.props.registerUser({ email, password, first_name, last_name, name, user_type_id });
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

    this.setState({
      passwordError: error
    })
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  }

  registerErrorBanner = () => {
    return (
      <LinearGradient
        start={{ x: 0.98, y: 0.06 }} end={{ x: 0.03, y: 1.0 }}
        locations={[0, 1]}
        colors={['#7059ED', '#DA152C']}
        style={styles.registerErrorBanner}>
        <TouchableOpacity style={styles.crossButton} onPress={() => {
          this.props.closeRegisterErrorBanner();
          this.setState({
            isChecked1: false,
            isChecked2: false,
            userName: '',
            userNameSuccessBorder: false,
            email: '',
            emailSuccessBorder: false,
            password: '',
            passwordSuccessBorder: false
          })
        }}>
          <BannerCloseIcon style={styles.crossIcon} color="#AC9FF4" />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Oh no! :('}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'center', fontFamily: Theme.FONT_REGULAR }}>{'Something went wrong \n while creating an account. \n Please try again.'}</Text>
        </View>
      </LinearGradient>
    )
  }

  registerSuccessBanner = () => {
    return (
      <LinearGradient
        start={{ x: 0.93, y: 0.14 }} end={{ x: 0, y: 1.0 }}
        locations={[0, 1]}
        colors={['#7059ED', '#00C2FB']}
        style={styles.loginBanner}>
        <TouchableOpacity style={styles.crossButton} onPress={() => {
          this.props.closeRegisterSuccessBanner();
          this.props.navigation.navigate('Sensorium');
          this.props.setHeaderItem('Sensorium');
          this.setState({
            isChecked1: false,
            isChecked2: false,
            userName: '',
            userNameSuccessBorder: false,
            email: '',
            emailSuccessBorder: false,
            password: '',
            passwordSuccessBorder: false
          })
        }}>
          <BannerCloseIcon style={styles.crossIcon} color="#AC9FF4" />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Welcome! :)'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Account successfully created!'}</Text>
        </View>
      </LinearGradient>
    )
  }

  createAccount = () => {
    // const scrollEnabled = this.state.screenHeight > height;
    const registerButtonDisabled = this.state.userNameSuccessBorder && this.state.emailSuccessBorder &&
      this.state.passwordSuccessBorder && this.state.isChecked1;
    let { requestPending } = this.props;
    return (
      <View style={styles.createContent}>
        <TouchableOpacity style={styles.crossButton} onPress={() => this.props.navigation.navigate('Login')}>
          <ModalCloseIcon style={styles.crossIcon} color="#777778" />
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
          </View>
          <View>
            <Text style={styles.emailText}>{'Name'}</Text>
            <InputTextField
              onChange={(value) => {
                this.setState({ userName: value.trim() })
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
              }}
              onBlur={() => this.validatePassword(this.state.password)}
              error={this.state.passwordError}
              showSuccessBorder={this.state.passwordSuccessBorder}
              showErrorBorder={this.state.passwordErrorBorder}
            />
            <View style={{ paddingTop: 10 }} />
            <CustomCheckBox
              size={24}
              checked={this.state.isChecked1}
              onClickCustomCheckbox={() => {
                this.setState({
                  isChecked1: !this.state.isChecked1
                })
              }}
              label={
                <Text>
                  <Text style={styles.checkBoxText}>{'By signing up you agree on the'}</Text>
                  <Text onPress={() => { Linking.openURL('https://synesthesia.com/#/TermsAndConditions') }}>
                    <Text style={[styles.checkBoxText, { color: '#25B999' }]}>
                      {' Terms & Conditions'}
                    </Text>
                  </Text>
                  <Text style={styles.checkBoxText}>{' and'}</Text>
                  <Text onPress={() => { Linking.openURL('https://synesthesia.com/#/privacy') }}>
                    <Text style={[styles.checkBoxText, { color: '#25B999' }]}>
                      {' Privacy Policy'}
                    </Text>
                  </Text>
                  <Text style={styles.checkBoxText}>{' of synesthesia.com'}</Text>
                </Text>
              }
            />
            <CustomCheckBox
              size={24}
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
                disabled={!registerButtonDisabled || requestPending}
                title="Create account"
                onPress={this.handleOnSubmit}
              />
            </View>
          </View>
        </ScrollView>

      </View>
    );
  }

  render() {
    let { alreadyRegistered, justRegistered } = this.props;
    return (
      <View style={styles.container}>
        {!alreadyRegistered && !justRegistered && this.createAccount()}
        {!alreadyRegistered && justRegistered && this.registerSuccessBanner()}
        {alreadyRegistered && !justRegistered && this.registerErrorBanner()}
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
  createAccount: {
    color: '#25B999',
    fontSize: 14,
    paddingTop: 4
  },
  noAccountYet: {
    color: '#FFFFFF',
    fontSize: 14,
    paddingTop: 4,
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
  createContent: {
    ...Platform.select({
      ios: {
        height: height - 250,
      },
      android: {
        height: height - 190
      },
    }),
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
  },
  registerErrorBanner: {
    height: height - 645,
    width: width - 30,
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 1
  }
});

function mapStateToProps(state) {
  return {
    justRegistered: state.registerReducer.justRegistered,
    alreadyRegistered: state.registerReducer.alreadyRegistered,
    requestPending: state.registerReducer.requestPending
  }
}

const mapDispatchToProps = {
  registerUser,
  closeRegisterErrorBanner,
  closeRegisterSuccessBanner,
  setHeaderItem
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen)

