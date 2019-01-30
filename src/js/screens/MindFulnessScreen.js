import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView, ImageBackground, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import BottomBar from '../components/BottomBar';
import CircleItemButton from '../components/CircleItemButton';

import { getMindFulness } from '../actions/MindFulnessAction'

const meditateImage = require('../../assets/meditateImage.png')
const multimedia = require('../../assets/multimedia.png')
const mindfulessImage = require('../../assets/mindfulnessheader.png')
const hearing = require('../../assets/hearing.png')
const watching = require('../../assets/watching.png')

// const videosList = [
//     { icon: multimedia, name: 'Start here' },
//     { icon: multimedia, name: 'Awareness of Breathing' },
//     { icon: multimedia, name: 'Awareness of Body' },
//     { icon: multimedia, name: 'Awareness of Body' },
//   ]

// const numberList = [
//     { number: 1, name: 'Start here', viewed: false, locked : false, unviewed: true },
//     { number: 2, name: 'Awareness of Breathing', viewed: true, locked : false , unviewed: false },
//     { number: 3, name: 'Awareness of Body', viewed: false, locked : true,  unviewed: false  },
//     { number: 4, name: 'Awareness of Body', viewed: false, locked : false,  unviewed: false  },
//   ]
  
//   const senseData = [
//     { icon: hearing, name: 'Hearing' },
//     { icon: watching, name: 'Watching' },
//     { icon: watching, name: 'Week 4' },
//   ]
  

class MindFulness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // videosList: videosList,
      // senseData: senseData,
      // numberList : numberList
    }
  }

  componentDidMount() {
    this.props.dispatch(getMindFulness());
  }

  componentWillUnmount() {
  }

  loadingPage = () => {
    return (
      <View style={{ height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "white", fontSize: 30 }}>Loading...</Text>
      </View>
    )
  }

  renderData = (mindFulnessDatas) => {
    const { isFetchingData } = this.props;
    if (mindFulnessDatas && !isFetchingData) {
      let arrData = [];
      mindFulnessDatas.map((data) => {
        let itemList = [];
        const header = data.header;
        const subHeader = data.subheader;
        var number = 1;
        data.children.map((item) => {
          if (item.is_published == 1) {
            itemList.push({ 
              id: item.id,
              number: number,
              name: item.display_name,
              viewed: item.is_done,
              locked: item.is_locked,
              unviewed: item.is_locked
            });
            number ++;
          }
        })
        arrData.push(this.renderContainers(data.id, header, subHeader, itemList));
      });
      return arrData;
    }
  }

  renderContainers = (id, header, subHeader, itemList) => {
    return (
      <View key={id}>
        <View style={{ paddingLeft: 10, paddingTop: 10 }}>
          <Text style={{ fontSize: 19, color: '#FFFFFF' }}>{header}</Text>
          <Text style={{ fontSize: 14, color: '#FFFFFF', marginTop: 5 }}>{subHeader}</Text>
        </View>
        <View style={{ height: 145 }}>
          <FlatList
            data={itemList}
            contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={({ item, index }) => this.renderNumber(itemList.id, itemList.length, item, index, 'videos')}
            extraData={itemList}
          />
        </View>
        <View style={{ height: 1, color: '#090909', width: '100%', marginTop: 15, borderColor: '#000000', borderWidth: 1 }} />
      </View>
    )
  }

  renderNumber = (id, itemLength, item, index, type) => {
    return(
      <View>
        <CircleItemButton 
          id = {id}
          index = {index}
          numberCount = {itemLength}
          item = {item}
        />
      </View>
    )
  }

  render() {
    const { isFetchingData, mindfulnessData } = this.props;
    const header = mindfulnessData.header;
    const subHeader = mindfulnessData.subheader;
    const mindFulnessDatas = mindfulnessData.children;

    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <BottomBar screen = {'mindfullness'}/>
        <ScrollView style = {{flexGrow: 1, marginBottom: 35}}>
          <ImageBackground
              style={{
                width: '100%',
                height: 137,
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
              }}>{header}</Text>
              <Text style={{
                fontSize: 14,
                paddingTop: 8,
                color: '#FFFFFF'
              }}>{subHeader}</Text>
            </View>
          </ImageBackground>
          {isFetchingData && this.loadingPage()}
          {this.renderData(mindFulnessDatas)}
          
          {/* <View style={{ paddingTop: 10, paddingLeft: 10 }}>
            <Text style={{ fontSize: 19, color: '#FFFFFF' }}>{'Groudwork Series'}</Text>
            <Text style={{ fontSize: 14, color: '#FFFFFF', marginTop: 5 }}>{'Deepen your mindful experiecne'}</Text>
          </View> */}
          {/* <View style={{ flex: 1 }}>
            <FlatList
              data={this.state.senseData}
              contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'row' }}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              renderItem={({ item, index }) => this.renderData(item, index, 'sense')}
              extraData={this.state.senseData}
            />
          </View> */}
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.mindfulnessReducer.error,
    isFetchingData: state.mindfulnessReducer.isFetchingData,
    mindfulnessData: state.mindfulnessReducer.mindfulnessData
  }
}

export default connect(mapStateToProps)(MindFulness);