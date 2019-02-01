import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView, ImageBackground, FlatList, Image, TouchableOpacity, ActivityIndicator, Modal, StyleSheet, Dimensions } from 'react-native';
import BottomBar from '../components/BottomBar';
import CircleItemButton from '../components/CircleItemButton';

import { getNodeByID, clearNode } from '../actions/NodeAction'
import { setMenuItem } from '../actions/SideMenuAction'

import BannerCloseIcon from '../icons/BannerCloseIcon';

const synesthesiaImage = require('../../assets/synesthesiaheader.png')
const banneractivitylockedImage = require('../../assets/lock3.png')
const bannerpaymentlockedImage = require('../../assets/lock4.png')

const { width, height } = Dimensions.get('screen');

class SynesthesiaItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLockedBannerVisible: false
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
        <ActivityIndicator
          animating = 'true'
          color = '#bc2b78'
          size = "large" />
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
        <View style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 20 }}>
          <Text style={{ fontSize: 19, color: '#FFFFFF' }}>{header}</Text>
          <Text style={{ fontSize: 14, color: '#FFFFFF', marginTop: 5, lineHeight: 19 }}>{subHeader}</Text>
        </View>
        <View style={{ height: 150, paddingTop: 10, paddingBottom: 0 }}> 
          <FlatList
            data={itemList}
            contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 12, paddingRight: 12 }}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={({ item, index }) => this.renderNumber(itemList.id, itemList.length, item, index, 'videos')}
            extraData={itemList}
          />
        </View>
        <View style={{ height: 1, color: '#090909', width: '100%', marginTop: 3, borderColor: '#000000', borderWidth: 1 }} />
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
          onPress = {() => this.onLeafClicked(item.locked)}
        />
      </View>
    )
  }

  LockedModalBanner = () => {
    const { isLockedBannerVisible } = this.state;
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return (
        <Modal visible={isLockedBannerVisible} animationType = "slide" transparent={true}
          onRequestClose={ () => console.log('closed')}>
          <View style={styles.modalContainer}>
            <View style={[styles.lockedBanner, styles.activityBannerHeight]}>
              <TouchableOpacity style={styles.crossButton} onPress={() => {
                this.setState({ isLockedBannerVisible: false })
              }}>
                <BannerCloseIcon style={styles.crossIcon} />
              </TouchableOpacity>
              <View>
                <Image style = {{alignSelf: 'center', height: 78, width: 84, marginTop: 1}} resizeMode = 'contain' source = {banneractivitylockedImage}/>
                <Text style = {{ fontSize: 20, textAlign: 'center', paddingLeft: 40, paddingRight: 40, color: '#FFFFFF', marginTop: 20 }}>This exercise is still locked!</Text>
                <Text style = {{ fontSize: 15, textAlign: 'center', paddingLeft: 40, paddingRight: 40, color: '#FFFFFF', marginTop: 20 }}>Complete the order exercise first</Text>
              </View>
              <TouchableOpacity style={[styles.modalButton, styles.continueButton]} onPress={() => {
                this.setState({ isLockedBannerVisible: false })
              }}>
                <Text style = {{ fontSize: 15, color: '#FFFFFF' }}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )
    } else {
      return (
        <Modal visible={isLockedBannerVisible} animationType = "slide" transparent={true}
          onRequestClose={ () => console.log('closed')}>
          <View style={styles.modalContainer}>
            <View style={[styles.lockedBanner, styles.paymentBannerHeight]}>
              <TouchableOpacity style={styles.crossButton} onPress={() => {
                this.setState({ isLockedBannerVisible: false })
              }}>
                <BannerCloseIcon style={styles.crossIcon} />
              </TouchableOpacity>
              <View>
                <Image style = {{alignSelf: 'center', height: 78, width: 84, marginTop: 1}} resizeMode = 'contain' source = {bannerpaymentlockedImage}/>
                <Text style = {{ fontSize: 18, textAlign: 'center', paddingLeft: 40, paddingRight: 40, color: '#FFFFFF', marginTop: 18 }}>This exercise is still locked!</Text>
                <Text style = {{ fontSize: 15, textAlign: 'center', paddingLeft: 40, paddingRight: 40, color: '#FFFFFF', marginTop: 20, lineHeight: 22 }}>To unlock this exercise checkout our attractive Price Plans</Text>
                <Text style = {{ fontSize: 15, textAlign: 'center', paddingLeft: 20, paddingRight: 20, color: '#FFFFFF', marginTop: 20 }}>Subscribe and get 7 Days of full access</Text>
              </View>
              <TouchableOpacity style={[styles.modalButton, styles.subscribeButton]} onPress={() => {
                this.setState({ isLockedBannerVisible: false })
                this.props.dispatch(setMenuItem('Pricing'))
                this.props.navigation.navigate('Pricing')
              }}>
                <Text style = {{ fontSize: 15, color: '#FFFFFF' }}>Subscribe here</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.nothanksButton]} onPress={() => {
                this.setState({ isLockedBannerVisible: false })
              }}>
                <Text style = {{ fontSize: 15, color: '#FFFFFF' }}>No, thanks</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )
    }
  }

  onLeafClicked = (locked) => {
    if (locked == "1") {
      this.setState({ isLockedBannerVisible: true });
    }
  }

  render() {
    const { isFetchingData, nodeData } = this.props;
    const header = nodeData.header;
    const subHeader = nodeData.subheader;

    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <BottomBar screen = {'syensthesia'} navigation = {this.props.navigation} />
        <ScrollView style = {{flexGrow: 1, marginBottom: 35}}>
          <ImageBackground
              style={{
                width: '100%',
                height: 137,
                display: "flex",
                alignItems: "center",
              }}
              resizeMode='contain'
              source={synesthesiaImage}
            >
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', paddingLeft: 30, paddingRight: 30 }}>
              <Text style={{
                textAlign: 'center',
                fontSize: 20,
                color: '#FFFFFF'
              }}>{header}</Text>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                paddingTop: 8,
                color: '#FFFFFF'
              }}>{subHeader}</Text>
            </View>
          </ImageBackground>
          {isFetchingData && this.loadingPage()}
          {this.renderData()}
          {this.LockedModalBanner()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lockedBanner: {
    height: height - 550,
    width: width - 30,
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#383938',
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    alignItems: 'center'
  },
  activityBannerHeight: {
    height: height - 550
  },
  paymentBannerHeight: {
    height: height - 450
  },
  crossButton: {
    width: 20,
    height: 20,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  crossIcon: {
    resizeMode: 'contain'
  },
  modalButton: {
    width: width - 100,
    height: 45,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButton: {
    marginTop: 30
  },
  subscribeButton: {
    backgroundColor: '#25B999',
    marginTop: 40,
    borderWidth: 0
  },
  nothanksButton: {
    marginTop: 15
  }
})

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    error: state.nodeReducer.error,
    isFetchingData: state.nodeReducer.isFetchingData,
    nodeData: state.nodeReducer.nodeData
  }
}

export default connect(mapStateToProps)(SynesthesiaItemScreen);