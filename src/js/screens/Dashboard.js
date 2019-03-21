import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import ProgressCircle from 'react-native-progress-circle'
import { BoxShadow } from 'react-native-shadow'

import { SvgIcon } from '../components/SvgIcon'
import { Theme } from '../constants/constants';

const weatherRain = require('../../assets/weather-rain.png')
const photo = require('../../assets/photo.png')
const userDetailArrowRight = require('../../assets/user_detail_arrow_right.png')
const profileDetailArrowRight = require('../../assets/profile_detail_arrow_right.png')
const surveyDetailArrowRight = require('../../assets/survey_detail_arrow_right.png')
const eLearningDetailArrowRight = require('../../assets/eLearning_detail_arrow_right.png')
const iconStudent = require('../../assets/icon_student.png')
const iconSurvey = require('../../assets/icon_survey.png')

const { width, height } = Dimensions.get('screen')

import { db } from '../../../Firebase'

const arrDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const arrMonth = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DES'];

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: 'Johannesburg, Gauteng',
      day: 4,
      date_month: 2,
      date_day: 13,
      userPoint: 350,
      profilePoint: 500,
      profileCompletePercent: 50,
      surveyPoint: 200,
      eLearningPoint: 200,
      profileInfo: {}
    }
  }

  componentDidMount() {
    const { idNumber } = this.props;

    let usersRef = db.ref('users/' + idNumber);
    usersRef.on('value', snapshot => {
      this.setState({profileInfo: snapshot.val()});
    })
  }

  onUserDetailBtnClicked = () => {
    
  }

  onProfileDetailBtnClicked = () => {
    this.props.navigation.navigate('MyProfile');
  }

  onSurveyDetailBtnClicked = () => {
    
  }

  onELearningDetailBtnClicked = () => {
    
  }

  render() {
    const { address, day, date_month, date_day, userPoint, profilePoint, profileCompletePercent, surveyPoint, eLearningPoint, profileInfo } = this.state;

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

        {/* <BoxShadow setting={shadowOpt}> */}
        <View style={styles.headerBack}>
          <View style={styles.headerSection}>
            <View style={styles.menuSection}>
              <View style={styles.goodMorning}>
                <SvgIcon name="menu" color="white" />
                <Text style={styles.goodMorningText}>{'Good morning'}</Text>
              </View>
              <Text style={styles.firstUserName}>{profileInfo.firstName}!</Text>
            </View>
            <View style={styles.weatherSection}>
              <Image style={styles.weather} source={weatherRain} />
              <Text style={styles.date}>{arrDay[day - 1]} {date_day} {arrMonth[date_month - 1]}</Text>
            </View>
          </View>
        </View>
        {/* </BoxShadow> */}

        <View style={styles.userInfoCard}>
          <View style={styles.userInfoCardHeader}>
            <Image style={styles.photo} source={photo} />
            <View style={styles.personInfoSection}>
              <View style={styles.userNameSection}>
                <Text style={styles.userName}>{profileInfo.firstName} {profileInfo.lastName}</Text>
                <Text style={styles.newbieFeature}>Newbie</Text>
              </View>
              <Text style={styles.address}>{address}</Text>
            </View>
            <TouchableOpacity style={styles.moreDetailBtnSection} onPress={() => this.onUserDetailBtnClicked()}>
              <Image style={styles.moreDetailArrowRight} source={userDetailArrowRight} />
            </TouchableOpacity>
          </View>
          <View style={styles.horSeperator} />
          <View style={styles.userInfoCardContent}>
            <View style={styles.pointSection}>
              <Text style={styles.userPoint}>{userPoint}</Text>
              <Text style={styles.points}>POINTS</Text>
            </View>
            <View style={styles.seperator} />
            <Text style={styles.userInfoCardContentText}>{'Earn poins by completing tasks.\n'}{'Redeem them for data and airtime'}</Text>
          </View>
        </View>

        <View style={styles.profileCard}>
          <ProgressCircle
            percent={profileCompletePercent}
            radius={25}
            borderWidth={8}
            color='#c3d836'
            shadowColor='#eaedf3'
            bgColor='white'
          />
          <View style={styles.profileCardContent}>
            <View style={styles.profileHeader}>
              <View style={styles.profileHeaderLeft}>
                <Text style={styles.yourProfile}>{'Your Profile'}</Text>
                <Text style={styles.profileFeature}>{profilePoint} {'Points'}</Text>
              </View>
              <TouchableOpacity style={styles.moreDetailBtnSection} onPress={() => this.onProfileDetailBtnClicked()}>
                <Image style={styles.moreDetailArrowRight} source={profileDetailArrowRight} />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileContentText}>{'Your profile is '}{profileCompletePercent}{'% complete. Complete your profile to earn another badge'}</Text>
          </View>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.surveyIconSection}>
            <Image style={styles.iconSurvey} source={iconSurvey} />
          </View>
          <View style={styles.profileCardContent}>
            <View style={styles.profileHeader}>
              <View style={styles.profileHeaderLeft}>
                <Text style={styles.yourProfile}>{'New Survey'}</Text>
                <Text style={styles.surveyFeature}>{surveyPoint} {'Points'}</Text>
              </View>
              <TouchableOpacity style={styles.moreDetailBtnSection} onPress={() => this.onSurveyDetailBtnClicked()}>
                <Image style={styles.moreDetailArrowRight} source={surveyDetailArrowRight} />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileContentText}>{'There is a new survey which you need to complete.'}</Text>
          </View>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.eLearningIconSection}>
            <Image style={styles.iconStudent} source={iconStudent} />
          </View>
          <View style={styles.profileCardContent}>
            <View style={styles.profileHeader}>
              <View style={styles.profileHeaderLeft}>
                <Text style={styles.yourProfile}>{'New eLearning Module'}</Text>
                <Text style={styles.eLearningFeature}>{eLearningPoint} {'Points'}</Text>
              </View>
              <TouchableOpacity style={styles.moreDetailBtnSection} onPress={() => this.onSurveyDetailBtnClicked()}>
                <Image style={styles.moreDetailArrowRight} source={eLearningDetailArrowRight} />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileContentText}>{'There is a new eLearning Module available for you to complete.'}</Text>
          </View>
        </View>

        <View style={styles.blankBottomView} />

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f3f8',
  },
  scrollView: {
    flexGrow: 1
  },
  headerBack: {
    width: '100%',
    height: 163,
    backgroundColor: '#2a3549',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 38
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  menuSection: {
    flexDirection: 'column'
  },
  goodMorning: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  goodMorningText: {
    fontSize: 23,
    fontFamily: Theme.FONT_REGULAR,
    color: 'white',
    textAlign: 'center',
    marginLeft: 15
  },
  firstUserName: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 23,
    color: Theme.colorLightBrown,
    marginLeft: 39,
    // marginTop: 3
  },
  weatherSection: {
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  weather: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end'
  },
  date: {
    marginTop: 5,
    fontFamily: Theme.FONT_BOLD,
    fontSize: 15,
    color: Theme.colorLightBrown
  },
  userInfoCard: {
    width: '92%',
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    marginTop: - 50,
    backgroundColor: 'white',
    marginLeft: '4%',
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: 'black',
    shadowOpacity: 0.5
  },
  userInfoCardHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  photo: {
    width: 40,
    height: 40,
    marginRight: 15
  },
  personInfoSection:{
    width: '80%',
    flexDirection: 'column'
  },
  userNameSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 18,
    color: Theme.colorBlack,
    marginRight: 10
  },
  newbieFeature: {
    // fontFamily: Theme.FONT_REGULAR,
    fontSize: 11,
    borderRadius: 15,
    backgroundColor: Theme.colorLightBrown,
    color: Theme.colorWhite,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2
  },
  address: {
    // fontFamily: FONT_REGULAR,
    fontSize: 13,
    color: Theme.colorLightGrey
  },
  moreDetailBtnSection: {
    width: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  moreDetailArrowRight: {
    width: 10,
    height: 16
  },
  horSeperator: {
    width: '96%',
    height: 0.5,
    backgroundColor: '#e5e5ea',
    marginTop: 10
  },
  userInfoCardContent: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15
  },
  pointSection: {
    flexDirection: 'column'
  },
  userPoint: {
    fontSize: 25,
    color: Theme.colorLightBrown
  },
  points: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 11,
    color: Theme.colorBlack
  },
  seperator: {
    width: 1,
    height: '100%',
    backgroundColor: Theme.colorLightGrey
  },
  userInfoCardContentText: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 13,
    lineHeight: 18,
    color: Theme.colorLightGrey,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileCard: {
    width: '92%',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    marginTop: 10,
    backgroundColor: Theme.colorWhite,
    marginLeft: '4%',
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 18 },
    shadowColor: Theme.colorBlack,
    shadowOpacity: 0.5
  },
  profileCardContent: {
    width: '82%',
    flexDirection: 'column',
    marginLeft: 15
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profileHeaderLeft: {
    width: '55%',
    flexDirection: 'row'
  },
  yourProfile: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 18,
    color: Theme.colorBlack,
    marginRight: 10
  },
  profileFeature: {
    height: 20,
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 11,
    borderRadius: 15,
    backgroundColor: Theme.colorLightGreen,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2
  },
  profileContentText: {
    fontSize: 13,
    color: Theme.colorLightGrey,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 18
  },
  surveyIconSection: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Theme.colorLightBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSurvey: {
    width: 24,
    height: 30
  },
  surveyFeature: {
    height: 20,
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 11,
    borderRadius: 15,
    backgroundColor: Theme.colorLightBlue,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2
  },
  eLearningIconSection: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f15b67',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStudent: {
    width: 35,
    height: 35
  },
  eLearningFeature: {
    height: 20,
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 11,
    borderRadius: 15,
    backgroundColor: Theme.colorLightRed,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2
  },
  blankBottomView: {
    height: 50
  }
});

function mapStateToProps(state) {
  return {
    idNumber: state.loginUserReducer.idNumber
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen)
