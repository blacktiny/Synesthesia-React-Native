import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions, ImageBackground, FlatList } from 'react-native';

const menu = require('../../assets/menu.png')
const resume = require('../../assets/resume.png')
const user = require('../../assets/user.png')
const home = require('../../assets/home.png')

class MeditateHeader extends Component {
    constructor(props) {
      super(props)
    }
    render() {
      return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 10 }}>
            <Image resizeMode='contain' style={{ height: 20, width: 20 }} source={menu} />
            <Text style={{ fontSize: 14, color: '#777778', textAlign: 'center', paddingTop: 7 }}>{'Menu'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SensoriumTab')} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 50 }}>
            <Image resizeMode='contain' style={{ height: 20, width: 20 }} source={resume} />
            <Text style={{ fontSize: 14, color: '#777778', textAlign: 'center', paddingTop: 7 }}>{'Resume'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('progress')} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 50 }}>
            <Image resizeMode='contain' style={{ height: 20, width: 20 }} source={user} />
            <Text style={{ fontSize: 14, color: '#777778', textAlign: 'center', paddingTop: 7 }}>{'Progress'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('meditate')} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 50 }}>
            <Image resizeMode='contain' style={{ height: 20, width: 20 }} source={home} />
            <Text style={{ fontSize: 14, color: '#FFFFFF', textAlign: 'center', paddingTop: 7 }}>{'Meditate'}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  export default MeditateHeader;