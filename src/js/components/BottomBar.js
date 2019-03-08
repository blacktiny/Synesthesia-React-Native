import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, Platform, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import { setHeaderItem } from '../actions/MeditateHeaderAction'

const rectangle = require('../../assets/rectangle.png')
const leftArrow = require('../../assets/leftArrow.png')
import { Theme } from '../constants/constants'
import FastImage from 'react-native-fast-image';
import { getBottomBarItem, setBottomBarItem } from '../actions/BottomBarAction'

const { width, height } = Dimensions.get('screen');

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: this.props.screen,
      navigation: this.props.navigation
    }
  }

  componentDidMount() {
    this.props.dispatch(getBottomBarItem());
  }

  moveToRootScreen = () => {
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: 'Sensorium' })]
    // })
    // this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('Sensorium');

    this.props.dispatch(setHeaderItem('Sensorium'))
  }

  onButtomItemClicked = (itemName) => {
    this.props.navigation.push(itemName)

    this.props.dispatch(setHeaderItem('Sensorium'))
  }

  render() {
    const { curBottomBarItem } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={{ width: 40, marginLeft: 5 }} onPress={() => this.moveToRootScreen()}>
          <FastImage style={styles.leftArrow} source={leftArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.direction} onPress={() => this.onButtomItemClicked('MindFulness')}>
          <Text style={[styles.textStyle, { color: (this.state.screen == 'mindfullness' || curBottomBarItem == 'MindFulness') ? '#FFFFFF' : '#777778' }]}>{'Mindfulness'}</Text>
          {(this.state.screen == 'mindfullness' || curBottomBarItem == 'MindFulness') && <FastImage style={styles.imageStyle} source={rectangle} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.direction} onPress={() => this.onButtomItemClicked('BeingAware')}>
          <Text style={[styles.textStyle, { color: (this.state.screen == 'beingaware' || curBottomBarItem == 'BeingAware') ? '#FFFFFF' : '#777778' }]}>{'Awareness'}</Text>
          {(this.state.screen == 'beingaware' || curBottomBarItem == 'BeingAware') && <FastImage style={[styles.imageStyle, { width: 77 }]} source={rectangle} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.direction} onPress={() => this.onButtomItemClicked('Synesthesia')}>
          <Text style={[styles.textStyle, { color: (this.state.screen == 'synesthesia' || curBottomBarItem == 'Synesthesia') ? '#FFFFFF' : '#777778' }]}>{'Synesthesia'}</Text>
          {(this.state.screen == 'synesthesia' || curBottomBarItem == 'Synesthesia') && <FastImage style={styles.imageStyle} source={rectangle} />}
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...Platform.select({
      ios: {
        height: 80
      },
      android: {
        height: 60
      },
    }),
    paddingTop: 12,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    bottom: 0,
    // justifyContent: 'space-between',
    flexDirection: 'row',
    zIndex: 111111,
    backgroundColor: '#1F1F20',

    shadowColor: 'rgb(14,13,13)',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { height: 1, width: 1 },
    elevation: 10
  },
  direction: {
    display: 'flex',
    flexDirection: 'column',
    width: (width - 55) / 3,
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 15,
    paddingTop: 12,
    paddingBottom: 0,
    fontFamily: Theme.FONT_SEMIBOLD
  },
  leftArrow: {
    height: 15,
    width: 15,
    marginTop: 15,
    marginLeft: 12,
  },
  imageStyle: {
    height: 3,
    width: 85,
    marginTop: 'auto'
  }
});

function mapStateToProps(state) {
  return {
    curBottomBarItem: state.bottomBarReducer.curBottomBarItem
  }
}

export default connect(mapStateToProps)(BottomBar);
