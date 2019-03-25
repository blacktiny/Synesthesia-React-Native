import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { getHeaderItem, setHeaderItem } from '../actions/MeditateHeaderAction'
import { setMenuItem } from '../../js/actions/SideMenuAction';
import { getUserProgress, cleanProgress } from '../actions/ProgressAction';
import { setBottomBarItem, toggleBottomBar } from '../actions/BottomBarAction'
import { Theme } from "../constants/constants";

const menu = require('../../assets/menu.png')
const menu_active = require('../../assets/menu_active.png')
const resume = require('../../assets/resume.png')
const user = require('../../assets/user.png')
const user_active = require('../../assets/user_active.png')
const meditateLogo = require('../../assets/meditate_icon_grey.png')
const meditateLogo_active = require('../../assets/meditateLogo.png')
import { openRegisterModal } from '../actions/ToggleFormModalAction'
import { addBlur } from '../actions/BlurAction'

import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('screen');

class MeditateHeader extends Component {

  componentDidMount() {
    this.props.dispatch(getHeaderItem());
  }

  onChangedHeaderItem(headerItem) {
    const { isLoggedIn } = this.props;

    if (headerItem == 'Progress') {
      if (!isLoggedIn) {
        this.props.dispatch(setHeaderItem('Sensorium'));
        this.props.dispatch(addBlur());
        this.props.dispatch(openRegisterModal());
      } else {
        this.props.dispatch(setHeaderItem(headerItem));
        this.props.navigation.navigate(headerItem, { backScreen: this.props.navigation.state.routeName });
        // this.props.dispatch(cleanProgress());
        // this.props.dispatch(getUserProgress());
        this.props.dispatch(setMenuItem(''));
      }
    }

    if (headerItem == 'Sensorium') {
      const { curActiveScreen, curBottomBarItem } = this.props;
      this.props.dispatch(setBottomBarItem('', ''));

      if (curActiveScreen) {
        this.props.navigation.push(curActiveScreen, { backScreen: curBottomBarItem })
      } else {
        this.props.navigation.navigate(headerItem);
      }
      this.props.dispatch(setMenuItem('Meditate'));
      // this.props.dispatch(cleanProgress());
      this.props.dispatch(setHeaderItem(headerItem));
    }

    this.props.dispatch(toggleBottomBar(true));
  }

  render() {
    const { curHeaderItem } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'row' }} >
        <TouchableOpacity onPress={() => {
          this.props.dispatch(toggleBottomBar(false))
          this.props.navigation.openDrawer()
        }} style={[styles.menuView]}>
          <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.imageStyle} source={curHeaderItem == '7 days for free' || curHeaderItem == 'My account' ? menu_active : menu} />
          <Text style={[styles.textStyle, { color: curHeaderItem == '7 days for free' || curHeaderItem == 'My account' ? '#ffffff' : '#777778' }]}>{'Menu'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('')} style={[styles.mainView, { paddingLeft: 0 }]}>
          <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.imageStyle} source={resume} />
          <Text style={styles.textStyle}>{'Next'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onChangedHeaderItem('Progress')} style={[styles.mainView, { paddingLeft: 0 }]}>
          <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.imageStyle} source={curHeaderItem == 'Progress' ? user_active : user} />
          <Text style={[styles.textStyle, { color: curHeaderItem == 'Progress' ? '#ffffff' : '#777778' }]}>{'Progress'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onChangedHeaderItem('Sensorium')} style={[styles.mainView, { paddingLeft: 0 }]}>
          <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.imageStyle} source={curHeaderItem == 'Sensorium' ? meditateLogo_active : meditateLogo} />
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
  menuView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 0,
    width: 80
  },
  mainView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: (width - 80) / 3
  }
});

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    curHeaderItem: state.meditateHeaderReducer.curHeaderItem,
    curBottomBarItem: state.bottomBarReducer.curBottomBarItem,
    curActiveScreen: state.bottomBarReducer.curActiveScreen
  }
}

export default connect(mapStateToProps)(MeditateHeader);