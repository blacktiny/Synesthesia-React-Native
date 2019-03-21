import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler
} from 'react-native';
import { Item, Label, Input, Form } from 'native-base';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  isIDNumberExistedAction,
  getUserProfileInfo,
  storeIDNumber
} from '../actions/LoginUserAction';

import { Theme } from '../constants/constants';

import { SvgIcon } from '../components/SvgIcon';

import { db } from '../../../Firebase';

const splash = require('../../assets/splash.png');
const yes_mark = require('../../assets/yes_mark.png');

const { width, height } = Dimensions.get('screen');

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProgressShow: true,
      indeterminate: true,
      isPinCodeInputShow: false,
      validationIDNumber: false,
      // isIDNumberExisted: false,
      idNumber: '',
      inputValue: '',
      inputedPinCode: '',
      showedPinCode: '',
      isInputFocused: false
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    const { isPinCodeInputShow, idNumber } = this.state;
    if (isPinCodeInputShow) {
      this.setState({
        isPinCodeInputShow: false,
        showedPinCode: '',
        inputedPinCode: '',
        inputValue: idNumber
      });
    } else {
      BackHandler.exitApp();
    }
    return true;
  }

  componentDidMount() {
    this.splashAnimate();
  }

  splashAnimate() {
    setTimeout(() => {
      this.setState({ indeterminate: false, isProgressShow: false });
    }, 1500);
  }

  is_luhn_valid = cardNumber => {
    const arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

    let len = cardNumber.length;
    let bit = 1;
    let sum = 0;
    let val;

    while (len) {
      val = parseInt(cardNumber.charAt(--len), 10);
      sum += (bit ^= 1) ? arr[val] : val;
    }

    return sum && sum % 10 === 0;
  };

  onInputIDNumberChanged = value => {
    if (this.is_luhn_valid(value) && value.length === 13) {
      this.setState({ validationIDNumber: true });
    } else {
      this.setState({ validationIDNumber: false });
    }

    this.setState({ inputValue: value });
  };

  onInputPinCodeChanged = value => {
    let passwordInputFormart = '•••••••••••••••••••••••••••••••••••';
    const { inputedPinCode, showedPinCode } = this.state;

    this.setState({
      showedPinCode: passwordInputFormart.substr(1, value.length),
      inputedPinCode: inputedPinCode + value.substr(value.length - 1, 1)
    });
  };

  checkIDNumberExisted = snapshot => {
    const { inputValue } = this.state;
    if (snapshot.hasChild(inputValue)) {
      this.setState({ isPinCodeInputShow: true, idNumber: inputValue });
    }
  };

  onGoButtonClicked = () => {
    const { isPinCodeInputShow, inputedPinCode, idNumber, validationIDNumber } = this.state;

    if (!isPinCodeInputShow) {
      if (validationIDNumber) {
        let usersRef = db.ref('users');
        usersRef.once('value', snapshot => this.checkIDNumberExisted(snapshot));
      } else {
        alert('Invalid ID Number');
      }
    } else {
      let usersRef = db.ref('users/' + idNumber + '/pin');
      usersRef.on('value', snapshot => {
        if (snapshot.val() === Number(inputedPinCode)) {
          this.props.storeIDNumber(idNumber);
          this.props.navigation.navigate('Dashboard');
        }
      });
    }
  };

  onInputFocused = () => {
    this.setState({ isInputFocused: true });
  };

  onInputBlur = () => {
    this.setState({ isInputFocused: false });
  };

  render() {
    const {
      isProgressShow,
      indeterminate,
      isPinCodeInputShow,
      validationIDNumber,
      showedPinCode,
      isInputFocused
    } = this.state;
    let { inputValue } = this.props;

    let authenticate;
    if (!isPinCodeInputShow) {
      authenticate = (
        // {/* <KeyboardAvoidingView behavior='position' enabled> */}
        <View style={styles.authenticate}>
          <Form style={styles.form}>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={styles.label}>ID NUMBER</Label>
              <Input
                style={styles.input}
                keyboardType='numeric'
                onChangeText={value => this.onInputIDNumberChanged(value)}
                onFocus={() => this.onInputFocused()}
                onBlur={() => this.onInputBlur()}
                underlineColorAndroid='#fff'
                maxLength={13}
              />
            </Item>
          </Form>
          {validationIDNumber && (
            <SvgIcon name='ok' color={Theme.colorLightGreen} />
          )}
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => this.onGoButtonClicked()}
          >
            <Text style={styles.goText}>{'Go'.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
        // </KeyboardAvoidingView>
      );
    } else {
      authenticate = (
        <View style={styles.authenticate}>
          <Form style={styles.form}>
            <Item floatingLabel style={styles.inputItem}>
              <Label style={styles.label}>PIN CODE</Label>
              <Input
                style={styles.input}
                keyboardType='numeric'
                value={showedPinCode}
                onChangeText={value => this.onInputPinCodeChanged(value)}
                underlineColorAndroid={'white'}
                maxLength={5}
              />
            </Item>
          </Form>
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => this.onGoButtonClicked()}
          >
            <Text style={styles.goText}>{'Go'.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Image
          style={[styles.splash, isInputFocused ? styles.imageMarginTop : '']}
          source={splash}
        />
        {/* <ImageBackground style={[styles.splash, isInputFocused ? styles.imageMarginTop : '']} source={splash}> */}
        <View style={styles.blankViewForMark} />
        <Image style={styles.yes_mark} source={yes_mark} />
        {isProgressShow && (
          <View>
            <View style={styles.blankView} />
            <Progress.Bar
              progress={0.5}
              width={250}
              borderColor={'#f6a72333'}
              color={'#f6a723'}
              indeterminate={indeterminate}
              style={styles.progressBack}
            />
          </View>
        )}
        {!isProgressShow && (
          <View style={{ width: '100%' }}>
            <View style={styles.blankViewForInput} />
            {authenticate}
          </View>
        )}
        {/* </ImageBackground> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000000',
    alignItems: 'center'
  },
  splash: {
    position: 'absolute',
    height: height,
    width: width,
    alignItems: 'center'
  },
  imageMarginTop: {
    marginTop: 170
  },
  blankViewForMark: {
    height: '40%'
  },
  yes_mark: {
    height: 140,
    width: 140
  },
  progressBack: {
    marginTop: '50%',
    backgroundColor: '#f6a72333'
  },
  blankViewForInput: {
    height: '45%'
  },
  authenticate: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white'
    // marginTop: -10
    // marginTop: 100
  },
  form: {
    width: 300,
    alignSelf: 'center'
  },
  inputItem: {},
  label: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 10,
    letterSpacing: 1,
    color: Theme.colorLightGrey,
    marginTop: -10,
    marginLeft: 4
  },
  input: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 15,
    color: Theme.colorBlack,
    marginTop: -15
  },
  okIcon: {
    marginRight: 23
  },
  goButton: {
    width: 72,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a3549'
  },
  goText: {
    fontSize: 11,
    letterSpacing: 2,
    color: Theme.colorWhite
  }
});

function mapStateToProps(state) {
  return {
    isIDNumberExisted: state.loginUserReducer.isIDNumberExisted
  };
}

const mapDispatchToProps = {
  // isIDNumberExistedAction,
  // getUserProfileInfo
  storeIDNumber
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
