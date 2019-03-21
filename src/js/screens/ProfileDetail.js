import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from 'react-native';
import { Item, Label, Input, Form } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { BoxShadow } from 'react-native-shadow'

import { SvgIcon } from '../components/SvgIcon';
import PersonInfoCard from '../components/PersonInfoCard';
import { Theme } from '../constants/constants';

import { getLocationByWhat3Words } from '../actions/ProfileDetailAction';

const updateBasicInfo = require('../../assets/arrow_next.png');

const { width, height } = Dimensions.get('window');

import { db } from '../../../Firebase';

class ProfileDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailVal: '',
      emailVerified: false,
      phoneVal: '',
      phoneVerified: false,
      isLocated: false,
      profileInfo: {},
      locationAddr: ''
    };
  }

  componentDidMount() {
    const { idNumber } = this.props;

    let usersRef = db.ref('users/' + idNumber);
    usersRef.on('value', snapshot => {
      this.setState({ profileInfo: snapshot.val() });
    });

    let firstNameRef = db.ref('users/' + idNumber + '/firstName');
    firstNameRef.on('value', snapshot => {
      this.setState({ firstName: snapshot.val() });
    });

    let lastNameRef = db.ref('users/' + idNumber + '/lastName');
    lastNameRef.on('value', snapshot => {
      this.setState({ lastName: snapshot.val() });
    });

    let emailRef = db.ref('users/' + idNumber + '/email');
    emailRef.on('value', snapshot => {
      this.setState({ emailVal: snapshot.val() });
    });

    let phoneRef = db.ref('users/' + idNumber + '/phone');
    phoneRef.on('value', snapshot => {
      this.setState({ phoneVal: snapshot.val() });
    });

    let emailVerifyRef = db.ref('users/' + idNumber + '/emailVerified');
    emailVerifyRef.on('value', snapshot => {
      this.setState({ emailVerified: snapshot.val() });
    });

    let phoneVerifyRef = db.ref('users/' + idNumber + '/phoneVerified');
    phoneVerifyRef.on('value', snapshot => {
      this.setState({ phoneVerified: snapshot.val() });
    });

    let locationRef = db.ref('users/' + idNumber + '/location/address');
    locationRef.on('value', snapshot => {
      this.setState({locationAddr: '/// ' + snapshot.val()});
      this.props.getLocationByWhat3Words(snapshot.val());
    });
  }

  onInputFirstNameChanged = (value) => {
    this.setState({firstName: value});
  }

  onInputLastNameChanged = (value) => {
    this.setState({lastName: value});
  }

  onInputEmailChanged = (value) => {
    this.setState({emailVal: value});
  }

  onInputPhoneChanged = (value) => {
    value = value.replace('+27 ', '');
    while (value.indexOf(' ') > -1) {
      value = value.replace(' ', '');
    }
    this.setState({phoneVal: value});
  }

  onLocationAddrChanged = (value) => {
    if (value.length > 3) {
      this.setState({locationAddr: value});
    }
  }

  gotoBackScreen = () => {
    this.props.navigation.navigate('MyProfile');
  };

  onEmailVerfication = () => {
    this.setState({ emailVerified: true });
  };

  onMobileNumberVerfication = () => {
    this.setState({ phoneVerified: true });
  };

  onTapToLocatBtnClicked = () => {
    this.setState({ isLocated: true });
  };

  onResetLocateBtnClicked = () => {
    this.setState({locationAddr: '/// '});
  };

  onLocateBtnClicked = () => {
    const { locationAddr } = this.state;

    this.props.getLocationByWhat3Words(locationAddr);
  };

  updateBasicInfo = () => {
    const { idNumber } = this.props;
    const { firstName, lastName, emailVal, phoneVal, emailVerified, phoneVerified, locationAddr } = this.state;

    phoneVal.replace('+27 ', '');
    phoneVal.replace(' ', '');

    let updateInfo = {
      firstName: firstName,
      lastName: lastName,
      email: emailVal,
      emailVerified: emailVerified,
      phone: phoneVal,
      phoneVerified: phoneVerified,
      location: {
        address: locationAddr.substr(4, locationAddr.length)
      }
    }

    let usersRef = db.ref('users/' + idNumber);
    usersRef.update(updateInfo);
  };

  render() {
    const { firstName, lastName, emailVal, phoneVal, emailVerified, phoneVerified, isLocated, profileInfo, locationAddr } = this.state;
    const { idNumber, location } = this.props;

    const shadowOpt = {
      width: 160,
      height: 170,
      color: '#190000',
      x: 0,
      y: 5
    };
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerBack}>
            <View style={styles.headerSection}>
              <SvgIcon
                name='left-open'
                color={Theme.colorLightGreen}
                onPress={() => this.gotoBackScreen()}
              />
              <Text style={styles.basicInfoText}>{'Basic Info'}</Text>
            </View>
            <Text style={styles.description}>
              {'Your name, ID number, etc'}
            </Text>
          </View>
          <View style={styles.headerUnderLine} />

          <View style={{ marginTop: 15 }}>
            <PersonInfoCard
              placeholder={'first name'}
              value={firstName}
              onInputValueChanged={(value) => this.onInputFirstNameChanged(value)}
              editable={true}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <PersonInfoCard
              placeholder={'last name'}
              value={lastName}
              onInputValueChanged={(value) => this.onInputLastNameChanged(value)}
              editable={true}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <PersonInfoCard
              placeholder={'id number'}
              value={idNumber}
              editable={false}
              verifyStatus={'verified'}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <PersonInfoCard
              inputType={'email'}
              placeholder={'email address'}
              value={emailVal}
              editable={!emailVerified}
              verifyStatus={
                emailVerified ? 'verified' : 'unverified'
              }
              onInputValueChanged={(value) => this.onInputEmailChanged(value)}
              onVerifyBtnClicked={() => this.onEmailVerfication()}
            />
          </View>

          <View style={{ marginTop: 15, marginBottom: 15 }}>
            <PersonInfoCard
              inputType={'phone'}
              placeholder={'mobile number'}
              value={phoneVal}
              editable={!phoneVerified}
              verifyStatus={
                phoneVerified ? 'verified' : 'unverified'
              }
              onInputValueChanged={(value) => this.onInputPhoneChanged(value)}
              onVerifyBtnClicked={() => this.onMobileNumberVerfication()}
            />
          </View>

          <View style={styles.mapSection}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.googleMap}
              region={{
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
              }}
            />
            {!isLocated && (
              <View style={styles.tapToLocate}>
                <SvgIcon
                  name={'icon_taptolocate'}
                  color='#da1f3d'
                  size={50}
                  onPress={() => this.onTapToLocatBtnClicked()}
                />
                <Text style={styles.tapToLocateText}>
                  {'Tap to locate yourself'}
                </Text>
              </View>
            )}
            {isLocated && (
              <View style={styles.inputLocationSection}>
                <Form style={styles.formLocation}>
                  <Item floatingLabel style={styles.inputItemLocation}>
                    <Label style={styles.labelLocation}>
                      {'location'.toUpperCase()}
                    </Label>
                    <Input
                      style={styles.inputLocation}
                      value={locationAddr}
                      underlineColorAndroid='transparent'
                      onChangeText={(value) => this.onLocationAddrChanged(value)}
                    />
                  </Item>
                </Form>
                <TouchableOpacity
                  style={styles.reset}
                  onPress={() => this.onResetLocateBtnClicked()}
                >
                  <Text style={styles.resetText}>{'reset'.toUpperCase()}</Text>
                </TouchableOpacity>
                <SvgIcon
                  name={'icon_taptolocate'}
                  color={Theme.colorLigthRed2}
                  size={56}
                  onPress={() => this.onLocateBtnClicked()}
                />
              </View>
            )}
          </View>

          <View style={styles.blankBottomView} />
        </ScrollView>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => this.updateBasicInfo()}
        >
          <Text style={styles.updateButtonText}>
            {'update basic info'.toUpperCase()}
          </Text>
          <Image style={styles.updateBasicInfoIcon} source={updateBasicInfo} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f1f3f8'
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#f1f3f8'
  },
  headerBack: {
    width: '100%',
    height: 97,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    backgroundColor: '#2a3549',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 38
  },
  headerUnderLine: {
    width: 95,
    height: 4,
    backgroundColor: Theme.colorLightGreen,
    marginTop: -4
  },
  headerSection: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  gobackButton: {
    width: 30,
    height: 30,
    backgroundColor: 'blue'
  },
  basicInfoText: {
    fontSize: 20,
    fontFamily: Theme.FONT_BOLD,
    color: Theme.colorWhite,
    textAlign: 'center',
    marginLeft: 15,
    color: Theme.colorLightGreen,
    marginTop: -6
  },
  description: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 13,
    color: Theme.colorLightGrey,
    marginLeft: 28
    // marginTop: 5
  },
  googleMap: {
    width: '92%',
    height: 150,
    marginTop: 15,
    marginLeft: '4%'
  },
  tapToLocate: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colorWhite,
    opacity: 0.9
  },
  tapToLocateText: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 15,
    color: Theme.colorLigthRed2,
    marginTop: 15
  },
  inputLocationSection: {
    width: '92%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '4%',
    backgroundColor: Theme.colorWhite
  },
  formLocation: {
    width: '65%'
  },
  labelLocation: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 10,
    letterSpacing: 1,
    color: Theme.colorLightGrey,
    marginTop: -10
  },
  inputSection: {
    flexDirection: 'row'
  },
  slashText: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 15,
    color: Theme.colorLigthRed2
  },
  inputLocation: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 15,
    color: Theme.colorBlack,
    marginTop: -10
  },
  reset: {
    width: 70,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  resetText: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 10,
    letterSpacing: 1,
    color: 'red'
  },
  updateButton: {
    position: 'absolute',
    width: '100%',
    height: hp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: hp('90%') - StatusBar.currentHeight,
    paddingLeft: '4%',
    paddingRight: '4%',
    backgroundColor: Theme.colorLightGreen
  },
  updateButtonText: {
    width: '90%',
    fontFamily: Theme.FONT_BOLD,
    fontSize: 14,
    color: Theme.colorWhite,
    letterSpacing: 2,
    textAlign: 'center',
    paddingLeft: 17
  },
  updateBasicInfoIcon: {
    width: 17,
    height: 11
  },
  blankBottomView: {
    height: 150
  }
});

function mapStateToProps(state) {
  return {
    idNumber: state.loginUserReducer.idNumber,
    location: state.profileDetailReducer.location
  };
}

const mapDispatchToProps = {
  getLocationByWhat3Words
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDetailScreen);
