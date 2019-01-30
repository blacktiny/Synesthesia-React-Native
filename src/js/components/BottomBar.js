import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Platform } from 'react-native';

const rectangle = require('../../assets/rectangle.png')
const leftArrow = require('../../assets/leftArrow.png')

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: this.props.screen,
      navigation: this.props.navigation
    }
  }

  render() {
    return (
      <View style={styles.container}>
       <Image style={{ height: 15, width: 15}} source={leftArrow} />
          <TouchableOpacity style={{ flexDirection: 'column'}} onPress = {()=> this.props.navigation.push('Synesthesia')}>
            <Text style={{ color: this.state.screen == 'syensthesia' ? '#FFFFFF':'#777778', fontSize: 15, marginBottom: 10 }}>{'Synesthesia'}</Text>
            {this.state.screen == 'syensthesia' && <Image style={{ height: 3, width: 85, alignSelf: 'flex-end', alignContent: 'flex-end' }} source={rectangle} />}
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'column'}} onPress = {()=> this.props.navigation.push('MindFulness')}>
            <Text style={{ color: this.state.screen == 'mindfullness' ? '#FFFFFF':'#777778', fontSize: 15, marginBottom: 10 }}>{'Mindfulness'}</Text>
            {this.state.screen == 'mindfullness' && <Image style={{ height: 3, width: 85, alignSelf: 'flex-end', alignContent: 'flex-end' }} source={rectangle} />}
          </TouchableOpacity>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: this.state.screen == 'beingaware' ? '#FFFFFF':'#777778', fontSize: 15, marginBottom: 10 }}>{'Being Aware'}</Text>
            {this.state.screen == 'beingaware' && <Image style={{ height: 3, width: 85, alignSelf: 'flex-end', alignContent: 'flex-end' }} source={rectangle} /> }
          </View>
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
});


export default BottomBar;