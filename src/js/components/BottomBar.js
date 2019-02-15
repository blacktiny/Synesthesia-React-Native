import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

const rectangle = require('../../assets/rectangle.png')
const leftArrow = require('../../assets/leftArrow.png')
import { Theme } from '../constants/constants'

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: this.props.screen,
      navigation: this.props.navigation
    }
  }

  moveToRootScreen = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Sensorium' })]
    })
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const { navigation } = this.state;
    console.log(navigation);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.moveToRootScreen()}>
          <Image style={styles.leftArrow} source={leftArrow} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.push('MindFulness')} style={styles.direction}>
          <Text style={[styles.textStyle, { color: this.state.screen == 'mindfullness' ? '#FFFFFF' : '#777778' }]}>{'Mindfulness'}</Text>
          {this.state.screen == 'mindfullness' && <Image style={styles.imageStyle} source={rectangle} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.push('BeingAware')} style={styles.direction}>
          <Text style={[styles.textStyle, { color: this.state.screen == 'beingaware' ? '#FFFFFF' : '#777778' }]}>{'Awareness'}</Text>
          {this.state.screen == 'beingaware' && <Image style={styles.imageStyle} source={rectangle} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.direction} onPress={() => this.props.navigation.push('Synesthesia')}>
          <Text style={[styles.textStyle, { color: this.state.screen == 'syensthesia' ? '#FFFFFF' : '#777778' }]}>{'Synesthesia'}</Text>
          {this.state.screen == 'syensthesia' && <Image style={styles.imageStyle} source={rectangle} />}
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    zIndex: 111111,
    backgroundColor: '#1F1F20',
    // #777778
    // justifyContent: 'space-between',
    // flexDirection : 'row'
  },
  direction: {
    flexDirection: 'column'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: Theme.FONT_SEMIBOLD
  },
  leftArrow: {
    height: 15,
    width: 15
  },
  imageStyle: {
    height: 3,
    width: 85,
    alignSelf: 'flex-end',
    alignContent: 'flex-end'
  }
});


export default BottomBar;