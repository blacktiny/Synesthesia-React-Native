import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView, ImageBackground, FlatList } from 'react-native';
import BottomBar from '../components/BottomBar';
import CircleItemButton from '../components/CircleItemButton';

import { getNodeByID, clearNode } from '../actions/NodeAction'

const mindfulessImage = require('../../assets/mindfulnessheader.png')

class SynesthesiaItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.dispatch(getNodeByID());
  }

  componentWillUnmount() {
    this.props.dispatch(clearNode());
  }

  loadingPage = () => {
    return (
      <View style={{ height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "white", fontSize: 30 }}>Loading...</Text>
      </View>
    )
  }

  renderData = () => {
    const { isFetchingData, nodeData } = this.props;
    if (nodeData && !isFetchingData) {
      let arrData = [];
      if (nodeData.children[0].type == 'leaf') {
        let itemDataList = [];
        const header = nodeData.header;
        const subHeader = nodeData.subheader;
        var number = 1;
        nodeData.children.map((item) => {
          if (item.is_published == 1) {
            itemDataList.push({ 
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
        arrData.push(this.renderContainers(nodeData.id, header, subHeader, itemDataList));
      } else {
        nodeData.children.map((data) => {
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
      }
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
    const { isFetchingData, nodeData } = this.props;
    const header = nodeData.header;
    const subHeader = nodeData.subheader;

    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <BottomBar screen = {'syensthesia'}/>
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
          {this.renderData()}
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.nodeReducer.error,
    isFetchingData: state.nodeReducer.isFetchingData,
    nodeData: state.nodeReducer.nodeData
  }
}

export default connect(mapStateToProps)(SynesthesiaItemScreen);