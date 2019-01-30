import React, { Component } from 'react'
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { Text, View, ScrollView, ImageBackground, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import BottomBar from '../components/BottomBar';

import { getSynesthesia } from '../actions/SynesthesiaAction'
import { getNodeByID } from '../actions/NodeAction'

const meditateImage = require('../../assets/meditateImage.png')
const multimedia = require('../../assets/multimedia.png')
const hearing = require('../../assets/hearing.png')
const watching = require('../../assets/watching.png')

const videosList = [
  { icon: multimedia, name: 'Start here' },
  { icon: multimedia, name: 'Awareness of Breathing' },
  { icon: multimedia, name: 'Awareness of Body' },
  { icon: multimedia, name: 'Awareness of Body' },
]

class Synesthesia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videosList: videosList
    }
  }

  componentDidMount() {
    // const { isLoggedIn } = this.props;

    // if (isLoggedIn) {
      this.props.dispatch(getSynesthesia());
    // }
  }

  onItemButtonClicked = (id) => {
    AsyncStorage.setItem('nodeID', id);
    this.props.navigation.navigate('SynesthesiaItem');
  }

  loadingPage = () => {
    return (
      <View style={{ height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "white", fontSize: 30 }}>Loading...</Text>
      </View>
    )
  }

  renderData = () => {
    const { synesthesiaData, isFetchingData } = this.props;
    if (synesthesiaData && !isFetchingData) {
      let arrData = [];
      synesthesiaData.map((data) => {
        let property = [];
        if (data.type != "leaf") {
          const header = data.header;
          const subHeader = data.subheader;
          data.children.map((item) => {
            property.push({ id: item.id, icon: hearing, name: item.display_name });
          })
          arrData.push(this.renderContainers(data.id, header, subHeader, property));
        }
      });
      return arrData;
    }
  }

  renderContainers = (key, header, subHeader, data) => {
    return (
      <View key={key} >
        <View style={{ paddingTop: 30, paddingLeft: 12, paddingRight: 12 }}>
          <Text style={{ fontSize: 19, color: '#FFFFFF' }}>{header}</Text>
          <Text style={{ fontSize: 14, color: '#FFFFFF', marginTop: 5 }}>{subHeader}</Text>
        </View>
        <View style={{ flex: 1, paddingLeft: 2 }}>
          <FlatList
            data={data}
            contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'row' }}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={({ item, index }) => this.renderContainerItem(item.id, item, index, 'sense')}
            extraData={data}
          />
        </View>
        <View style={{ height: 1, color: '#090909', width: '100%', borderColor: '#000000', borderWidth: 1 }} />
      </View>
    )
  }

  renderContainerItem = (id, item, index, type) => {
    return (
      <View style={{ width: type == 'videos' ? 90 : 110, alignItems: 'center', margin: type == 'videos' ? 10 : 20 }}>
        <TouchableOpacity onPress={() => this.onItemButtonClicked(id)}>
          <Image
            source={item.icon}
            style={{ width: type == 'videos' ? 100 : 170, height: type == 'videos' ? 100 : 150, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: type == 'videos' ? 10 : 20, width: type == 'videos' ? 90 : 150 }}>
          <Text style={{ fontSize: 14, color: '#FFFFFF' }}>
            {item.name}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const { isFetchingData } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <BottomBar screen = {'syensthesia'}/>
        <ScrollView style = {{flexGrow: 1, marginBottom: 35}}>
          <Image
            style={{ height: 137, width: '100%' }}
            resizeMode='cover'
            source={meditateImage}
          />
          {/* <View style={{ paddingLeft: 10, paddingTop: 10 }}>
            <Text style={{ fontSize: 19, color: '#FFFFFF' }}>{'Synesthetic Gateway'}</Text>
            <Text style={{ fontSize: 14, color: '#FFFFFF', marginTop: 5 }}>{'Start to discover different Types of Synesthesia.'}</Text>
          </View>
          <View style={{ height: 145 }}>
            <FlatList
              data={this.state.videosList}
              contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'row' }}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              renderItem={({ item, index }) => this.renderContainerItem(item, index, 'videos')}
              extraData={this.state.videosList}
            />
          </View> */}
          {isFetchingData && this.loadingPage()}
          {this.renderData()}
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.synesthesiaReducer.error,
    isFetchingData: state.synesthesiaReducer.isFetchingData,
    synesthesiaData: state.synesthesiaReducer.synesthesiaData
  }
}

export default connect(mapStateToProps)(Synesthesia);