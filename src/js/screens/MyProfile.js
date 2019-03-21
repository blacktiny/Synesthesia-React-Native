import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { BoxShadow } from 'react-native-shadow'

import { SvgIcon } from '../components/SvgIcon'
import { Theme } from '../constants/constants';

const iconInspection = require('../../assets/icon_inspection.png')
const iconChecked = require('../../assets/icon_checked.png')

const { width, height } = Dimensions.get('screen')

import { db } from '../../../Firebase'

const arrDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const arrMonth = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'des'];

class MyProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 4,
      date_month: 2,
      date_day: 13,
      completePercent: 50,
      points: 100,
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

  onUserBasicInfoDetail = () => {
    this.props.navigation.navigate('ProfileDetail');
  }

  render() {
    const { day, date_month, date_day, completePercent, points, profileInfo } = this.state;
    const shadowOpt = {
      width: 160,
      height: 170,
      color:"#190000",
      x: 0,
      y: 5
  }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>

        <View style={styles.headerBack}>
          <View style={styles.menuSection}>
            <SvgIcon name="menu" color={Theme.colorLightGreen} />
            <Text style={styles.myProfileText}>{'My Profile'}</Text>
          </View>
          <Text style={styles.date}>{arrDay[day - 1].toUpperCase()} {date_day} {arrMonth[date_month - 1].toUpperCase()}</Text>
        </View>

        <View style={styles.personInfoSection}>
          <View style={styles.photo}>
            <SvgIcon name="camera" color={Theme.colorWhite} />
            <Text style={styles.addPhoto}>{'Add a photo'}</Text>
          </View>
          <Text style={styles.userName}>{profileInfo.firstName + '\n'}{profileInfo.lastName}</Text>
        </View>

        {/* <BoxShadow setting={shadowOpt}> */}
          <TouchableOpacity style={styles.basicInfoComplete} onPress={() => this.onUserBasicInfoDetail()}>
            <View style={styles.inspectIconSection}>
              <Image style={styles.iconInspection} source={iconInspection} />
            </View>
            <View style={styles.basicCompleteText}>
              <Text style={styles.basicInfo}>{'Basic Info'}</Text>
              <Text style={styles.complete}>{completePercent}{'% Complete'}</Text>
            </View>
          </TouchableOpacity>
        {/* </BoxShadow> */}

        <TouchableOpacity style={styles.basicPointComplete} onPress={() => this.onUserBasicInfoDetail()}>
          <View style={styles.inspectIconSection}>
            <Image style={styles.iconInspection} source={iconInspection} />
          </View>
          <View style={styles.basicCompleteText}>
            <View style={styles.basicInfoHeader}>
              <Text style={styles.basicInfo}>{'Basic Info'}</Text>
              <Image style={styles.iconChecked} source={iconChecked} />
            </View>
            <Text style={styles.points}>{points}{' Points'}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.blankBottomView} />

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f3f8',
  },
  scrollView: {
    flexGrow: 1
  },
  headerBack: {
    width: '100%',
    height: 163,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2a3549',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 38
  },
  menuSection: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  myProfileText: {
    fontSize: 20,
    fontFamily: Theme.FONT_BOLD,
    color: Theme.colorWhite,
    textAlign: 'center',
    marginLeft: 15,
    color: Theme.colorLightGreen,
    marginTop: -6
  },
  date: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 13,
    color: Theme.colorLightGreen,
    marginTop: 5
  },
  personInfoSection: {
    flexDirection: 'row',
    paddingLeft: 15,
    marginTop: -80,
    marginBottom: 15
  },
  photo: {
    width: 100,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: Theme.colorLightGreen,
    marginRight: 25
  },
  addPhoto: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 12,
    color: Theme.colorWhite,
    textAlign: 'center'
  },
  userName: {
    // fontFamily: Theme.FONT_LIGHT,
    fontSize: 29,
    alignSelf: 'center',
    color: 'white',
    marginTop: -20
  },
  basicInfoComplete: {
    width: '92%',
    flexDirection: 'row',
    padding: 15,
    marginLeft: '4%',
    backgroundColor: 'white',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: '#190000',
    shadowOpacity: 0.1,
    marginBottom: 15,
    elevation: 18
  },
  inspectIconSection: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Theme.colorLightGreen,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconInspection: {
    width: 24,
    height: 28
  },
  basicCompleteText: {
    flexDirection: 'column',
    marginLeft: 20
  },
  basicInfoHeader: {
    width: '73%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  basicInfo: {
    fontSize: 18,
    color: 'black',
  },
  iconChecked: {
    width: 20,
    height: 20
  },
  complete: {
    fontSize: 15,
    color: Theme.colorLightGrey
  },
  basicPointComplete: {
    width: '92%',
    flexDirection: 'row',
    padding: 15,
    marginLeft: '4%',
    backgroundColor: 'white',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#190000',
    shadowOpacity: 0.2,
    marginBottom: 12,
    elevation: 18
  },
  points: {
    fontSize: 15,
    color: '#4cd964'
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
)(MyProfileScreen)
