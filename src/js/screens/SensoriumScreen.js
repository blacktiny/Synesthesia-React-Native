
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView, ImageBackground, Button, Image, TouchableOpacity } from 'react-native';
import BottomBar from '../components/BottomBar';

import { getSensorium } from '../actions/SensoriumAction'

const synesthesiaImage = require('../../assets/synesthesia.png')
const mindfulessImage = require('../../assets/mindfulness.png')
const awarenessImage = require('../../assets/awareness.png')
const saveProgressImage = require('../../assets/saveProgressImage.png')

const SensoriumIdList = [ '337', '338', '1082' ];

class Sensorium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrData: []
    }
  }

  openSensoriumById = (id) => {
    console.log("enter synesthesia")
  }

  componentDidMount() {
    this.props.dispatch(getSensorium());
  }

  loadingPage = () => {
    return (
      <View style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "white", fontSize: 30 }}>Loading...</Text>
      </View>
    )
  }

  renderData = () => {
    const { sensoriumData, isFetchingData } = this.props;
    let arrData = [];

    if (sensoriumData && !isFetchingData) {
      sensoriumData.map((data) => {
        if (SensoriumIdList.indexOf(data.id) != -1) {
          let property = [];
          property.header = data.header;
          const nEnd = data.subheader.indexOf('.');
          if (nEnd > 0)
            property.subHeader = data.subheader.substring(0, nEnd + 1);
          else
            property.subHeader = data.subheader;

          switch (data.id) {
            case '337':
              {
                property.id = 337;
                property.name = "MindFulness";
                property.imgURL = mindfulessImage;
              }
              break
            case '338':
              {
                property.id = 338;
                property.name = "Synesthesia";
                property.imgURL = synesthesiaImage;
              }
              break
            case '1082':
              {
                property.id = 1082;
                property.name = "Awareness";
                property.imgURL = awarenessImage;
              }
              break
          }

          arrData.push(this.renderDataGroup(property));
        }
      })
      return arrData;
    }
  }

  renderDataGroup = (property) => {
    return (
      <View key={property.id}>
        <TouchableOpacity onPress={() => this.props.navigation.push(property.name)}>
          <View>
            <ImageBackground
              style={{
                width: '100%',
                height: 235,
                display: "flex",
                alignItems: "center",
              }}
              resizeMode='contain'
              source={property.imgURL}
            >
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                  fontSize: 20,
                  color: '#FFFFFF'
                }}>{property.header}</Text>
              </View>
            </ImageBackground>
            <View style={{ paddingLeft: 15, marginTop: -60 }}>
              <Text style={{ fontSize: 17, color: '#FFFFFF' }}>{property.subHeader}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { isFetchingData } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
      <BottomBar navigation = {this.props.navigation}/>
        <ScrollView>
          {isFetchingData && this.loadingPage()}
          {this.renderData()}
          {/* <TouchableOpacity onPress={() => this.props.navigation.push('Synesthesia')}>
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
          </View> */}
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

function mapStateToProps(state) {
  return {
    error: state.sensoriumReducer.error,
    isFetchingData: state.sensoriumReducer.isFetchingData,
    sensoriumData: state.sensoriumReducer.sensoriumData
  }
}

export default connect(mapStateToProps)(Sensorium);