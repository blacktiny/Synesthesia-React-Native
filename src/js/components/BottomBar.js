import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Platform, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import { setHeaderItem } from '../actions/MeditateHeaderAction'

const rectangle = require('../../assets/rectangle.png')
const leftArrow = require('../../assets/leftArrow.png')
import { Theme } from '../constants/constants'

const { width, height } = Dimensions.get('screen');

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: this.props.screen,
      navigation: this.props.navigation
    }
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
    const { navigation } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={{width: 40, marginLeft: 5}} onPress={() => this.moveToRootScreen()}>
          <Image style={styles.leftArrow} source={leftArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.direction} onPress={() => this.onButtomItemClicked('MindFulness')}>
          <Text style={[styles.textStyle, { color: this.state.screen == 'mindfullness' ? '#FFFFFF' : '#777778' }]}>{'Mindfulness'}</Text>
          {this.state.screen == 'mindfullness' && <Image style={styles.imageStyle} source={rectangle} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.direction} onPress={() => this.onButtomItemClicked('BeingAware')}>
          <Text style={[styles.textStyle, { color: this.state.screen == 'beingaware' ? '#FFFFFF' : '#777778' }]}>{'Awareness'}</Text>
          {this.state.screen == 'beingaware' && <Image style={styles.imageStyle} source={rectangle} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.direction} onPress={() => this.onButtomItemClicked('Synesthesia')}>
          <Text style={[styles.textStyle, { color: this.state.screen == 'syensthesia' ? '#FFFFFF' : '#777778' }]}>{'Synesthesia'}</Text>
          {this.state.screen == 'syensthesia' && <Image style={styles.imageStyle} source={rectangle} />}
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
    // #777778
    // justifyContent: 'space-between',
    // flexDirection : 'row'
  },
  direction: {
    display: 'flex',
    flexDirection: 'column',
    width: (width - 45) / 3,
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 15,
    ...Platform.select({
      ios: {
        paddingTop: 12,
        paddingBottom: 0,
      },
      android: {
        paddingTop: 12,
        paddingBottom: 0,
      },
    }),
    fontFamily: Theme.FONT_SEMIBOLD
  },
  leftArrow: {
    height: 15,
    width: 15,
    ...Platform.select({
      ios: {
        marginTop: 12,
        marginLeft: 12,
      },
      android: {
        marginTop: 12,
        marginLeft: 12,
      },
    }),
  },
  imageStyle: {
    height: 3,
    width: 85,
    marginTop: 'auto'
  }
});

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(BottomBar);