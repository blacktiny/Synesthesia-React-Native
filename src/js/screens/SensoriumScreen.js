
import React, { Component } from 'react'
import { Text, View, ScrollView, ImageBackground, Button, Image, TouchableOpacity } from 'react-native';
import BottomBar from '../components/BottomBar';

const synesthesiaImage = require('../../assets/synesthesia.png')
const mindfulessImage = require('../../assets/mindfulness.png')
const awarenessImage = require('../../assets/awareness.png')
const saveProgressImage = require('../../assets/saveProgressImage.png')


class Sensorium extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }
  
    openSensoriumById = (id) => {
      console.log("enter synesthesia")
    }
  
    componentDidUpdate() {
      const { navigation } = this.props;
  
      // if (getSynesthesiaSuccess) navigation.navigate('Synesthesia');
    }
  
    render() {
      return (
        <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <BottomBar navigation = {this.props.navigation}/>
          <ScrollView>
            <TouchableOpacity onPress={() => this.props.navigation.push('Synesthesia')}>
              <View>
                <ImageBackground
                  style={{
                    width: '100%',
                    height: 235,
                    display: "flex",
                    alignItems: "center",
                  }}
                  resizeMode='contain'
                  source={synesthesiaImage}
                >
                  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                      fontSize: 20,
                      color: '#FFFFFF'
                    }}>{'Discover Synesthesia'}</Text>
                  </View>
                </ImageBackground>
                <View style={{ paddingLeft: 15, marginTop: -60 }}>
                  <Text style={{ fontSize: 17, color: '#FFFFFF' }}>{'Garden of Synesthesia'}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.push('MindFulness')}>
              <View style={{ marginTop: -10 }}>
                <ImageBackground
                  style={{
                    width: '100%',
                    height: 235,
                    display: "flex",
                    alignItems: "center",
                  }}
                  resizeMode='contain'
                  source={mindfulessImage}
                >
                  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                      fontSize: 20,
                      color: '#FFFFFF'
                    }}>{'Practice Mindfulness'}</Text>
                  </View>
                </ImageBackground>
                <View style={{ paddingLeft: 15, marginTop: -60 }}>
                  <Text style={{ fontSize: 17, color: '#FFFFFF' }}>{'Path of Mindfulness'}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: -10 }}>
              <ImageBackground
                style={{
                  width: '100%',
                  height: 235,
                  display: "flex",
                  alignItems: "center",
                }}
                resizeMode='contain'
                source={awarenessImage}
              >
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    textAlign: 'center'
                  }}>{'Integrate Awareness \n into life'}</Text>
                </View>
              </ImageBackground>
              <View style={{ paddingLeft: 15, marginTop: -60 }}>
                <Text style={{ fontSize: 17, color: '#FFFFFF' }}>{'Life with Awareness'}</Text>
              </View>
            </View>
            <View style={{ marginTop: -20 }}>
              <Image
                style={{
                  width: '100%',
                }}
                resizeMode='contain'
                source={saveProgressImage}
              />
            </View>
          </ScrollView>
  
        </View>
      )
    }
  }

  export default  Sensorium;