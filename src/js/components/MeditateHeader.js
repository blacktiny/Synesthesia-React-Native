import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const menu = require('../../assets/menu.png')
const resume = require('../../assets/resume.png')
const user = require('../../assets/user.png')
const meditateLogo = require('../../assets/meditateLogo.png')

class MeditateHeader extends Component {
  constructor(props) {
    super(props)
  }
  render() {
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
        <TouchableOpacity onPress={() => console.log('progress')} style={[styles.mainView, { paddingLeft: 50 }]}>
          <Image resizeMode='contain' style={styles.imageStyle} source={user} />
          <Text style={styles.textStyle}>{'Progress'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Sensorium')} style={[styles.mainView, { paddingLeft: 50 }]}>
          <Image resizeMode='contain' style={styles.imageStyle} source={meditateLogo} />
          <Text style={[styles.textStyle, { color: '#fff' }]}>{'Meditate'}</Text>
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

export default MeditateHeader;