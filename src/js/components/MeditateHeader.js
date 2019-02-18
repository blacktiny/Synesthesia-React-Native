import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { getHeaderItem, setHeaderItem } from '../actions/MeditateHeaderAction'
import { setMenuItem } from '../../js/actions/SideMenuAction';
import { getUserProgress, cleanProgress } from '../actions/ProgressAction';
import { Theme } from "../constants/constants";

const menu = require('../../assets/menu.png')
const resume = require('../../assets/resume.png')
const user = require('../../assets/user.png')
const user_active = require('../../assets/user_active.png')
const meditateLogo = require('../../assets/meditate_icon_grey.png')
const meditateLogo_active = require('../../assets/meditateLogo.png')

class MeditateHeader extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(getHeaderItem());
  }

  onChangedHeaderItem(headerItem) {
    const { isLoggedIn } = this.props;
    this.props.navigation.navigate(headerItem);

    if (headerItem == 'Sensorium') {
      this.props.dispatch(setMenuItem('Meditate in Sensorium'));
      // this.props.dispatch(cleanProgress());
      this.props.dispatch(setHeaderItem(headerItem));
    } else if (headerItem == 'Progress') {
      if (!isLoggedIn) {
        this.props.dispatch(setHeaderItem('Sensorium'));
        this.props.navigation.navigate('Register');
      } else {
        this.props.dispatch(cleanProgress());
        this.props.dispatch(getUserProgress());
        this.props.dispatch(setHeaderItem(headerItem));
      }
      this.props.dispatch(setMenuItem(''));
    }
  }

  render() {
    const { curHeaderItem } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={[styles.mainView, { paddingLeft: 10 }]}>
          <Image resizeMode='contain' style={styles.imageStyle} source={menu} />
          <Text style={styles.textStyle}>{'Menu'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('')} style={[styles.mainView, { paddingLeft: 50 }]}>
          <Image resizeMode='contain' style={styles.imageStyle} source={resume} />
          <Text style={styles.textStyle}>{'Resume'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onChangedHeaderItem('Progress')} style={[styles.mainView, { paddingLeft: 50 }]}>
          <Image resizeMode='contain' style={styles.imageStyle} source={curHeaderItem == 'Progress' ? user_active : user} />
          <Text style={[styles.textStyle, { color: curHeaderItem == 'Progress' ? '#ffffff' : '#777778' }]}>{'Progress'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onChangedHeaderItem('Sensorium')} style={[styles.mainView, { paddingLeft: 50 }]}>
          <Image resizeMode='contain' style={styles.imageStyle} source={curHeaderItem == 'Sensorium' ? meditateLogo_active : meditateLogo} />
          <Text style={[styles.textStyle, { color: curHeaderItem == 'Sensorium' ? '#ffffff' : '#777778' }]}>{'Meditate'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    color: '#777778',
    textAlign: 'center',
    fontFamily: Theme.FONT_SEMIBOLD,
    paddingTop: 7
  },
  imageStyle: {
    height: 20,
    width: 20
  },
  mainView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    curHeaderItem: state.meditateHeaderReducer.curHeaderItem
  }
}

export default connect(mapStateToProps)(MeditateHeader);