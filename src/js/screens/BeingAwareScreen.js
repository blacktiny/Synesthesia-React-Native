import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage, Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, StyleSheet, Modal } from 'react-native';
import BottomBar from '../components/BottomBar';
import ActivityDependentExercise from '../components/ActivityDependentExercise';
import NotActivityDependentExercise from '../components/NotActivityDependentExercise';

import { getBeingAware } from '../actions/BeingAwareAction'

import BannerCloseIcon from '../icons/BannerCloseIcon';

const banneractivitylockedImage = require('../../assets/lock3.png')
const bannerpaymentlockedImage = require('../../assets/lock4.png')
import { Theme } from '../constants/constants'
import { iPhoneX } from '../../js/util';
const hearing = require('../../assets/hearing.png')
import { FILES_URL } from '../constants/constants'
import ProgressiveImage from '../components//ProgressiveImage';

const { width, height } = Dimensions.get('screen');

class BeingAware extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLockedBannerVisible: false
    }
  }

  componentDidMount() {
    this.props.dispatch(getBeingAware());
  }

  componentWillUnmount() {
  }

  onItemButtonClicked = (id) => {
    AsyncStorage.setItem('nodeID', id);
    this.props.navigation.navigate('SynesthesiaItem');
  }


  loadingPage = () => {
    return (
      <View style={{ height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    )
  }

  renderData = (beingAwareDatas) => {
    const { isFetchingData } = this.props;
    if (beingAwareDatas && !isFetchingData) {
      let arrData = [];
      beingAwareDatas.map((data) => {
        let property = [];
        const header = data.header;
        const subHeader = data.subheader;
        const imageBanner = FILES_URL + data.image_banner;
        var number = 1;
        data.children.map((item) => {
          property.push({
            id: item.id,
            number: number,
            icon: FILES_URL + item.image_square,
            type: item.type,
            name: item.display_name,
            is_done: item.is_done,
            is_free: item.is_free,
            is_locked: item.is_locked,
            is_published: item.is_published,
            activity_id: item.activity_id,
            position_id: item.position_id
          });
          number++;
        })
        arrData.push(this.renderContainers(data.id, header, subHeader, imageBanner, property));
      });
      return arrData;
    }
  }

  renderContainers = (key, header, subHeader, imageBanner, data) => {
    // debugger
    return (
      <View key={key} >
        {imageBanner.includes("null") ?
          <View style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 20 }}>
            <Text style={{ fontSize: 19, color: '#FFFFFF', fontFamily: Theme.FONT_BOLD }}>{header}</Text>
            <Text style={{ fontSize: 14, color: '#FFFFFF', marginTop: 5, fontFamily: Theme.FONT_MEDIUM }}>{subHeader}</Text>
          </View>
          :
          <View style={{ marginTop: -30 }}>
            <ProgressiveImage
              thumbnailSource={{ uri: imageBanner }}
              source={{ uri: imageBanner }}
              style={{ width: '100%', height: 137 }}
              resizeMode="cover"
              isImageBanner={true}
            />
            <Text style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#FFFFFF',
              position: 'absolute',
              top: 40,
              left: 0,
              right: 0,
              fontFamily: Theme.FONT_BOLD
            }}>{header}</Text>
            <Text style={{
              textAlign: 'center',
              fontSize: 14,
              paddingTop: 8,
              color: '#FFFFFF',
              position: 'absolute',
              top: 60,
              left: 0,
              right: 0,
              paddingLeft: 30,
              paddingRight: 30,
              fontFamily: Theme.FONT_MEDIUM
            }}>{subHeader}</Text>
          </View>
        }
        <View style={{ flex: 1, paddingLeft: 2 }}>
          <FlatList
            data={data}
            contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'row' }}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={({ item, index }) => this.renderContainerItem(item.id, item, index, data.length)}
            extraData={data}
          />
        </View>
        <View style={{ height: 1, color: 'rgba(9,9,9, 0.26)', width: '100%', borderColor: 'rgba(9,9,9, 0.26)', borderWidth: 1, marginTop: 15, marginBottom: 15 }} />
      </View>
    )
  }

  renderContainerItem = (id, item, index, itemList) => {
    const { beingawareData } = this.props;
    const nodes = beingawareData.children;
    return (

      <View>
        {
          item.type == "leaf" ?
            this.checkIfExerciseIsActivityDependentOrNot(nodes, item) ?
              <ActivityDependentExercise
                id={id}
                index={index}
                numberCount={itemList}
                item={item}
                onPress={() => this.onLeafClicked(item)}
              /> :
              <NotActivityDependentExercise
                id={id}
                index={index}
                numberCount={itemList}
                item={item}
                onPress={() => this.onLeafClicked(item)}
              />
            :
            <View style={{ width: 110, alignItems: 'center', marginTop: 20, marginRight: 10, marginLeft: 20, marginBottom: 20 }}>
              <TouchableOpacity onPress={() => { this.onItemButtonClicked(id) }}>
                {item.icon.includes("null") ?
                  <Image
                    source={hearing}
                    style={{ width: 130, height: 130, resizeMode: 'contain' }}
                  />
                  :
                  <ProgressiveImage
                    thumbnailSource={{ uri: item.icon }}
                    source={{ uri: item.icon }}
                    style={{ width: 120, height: 120, borderRadius: 12 }}
                    resizeMode="cover"
                  />
                }
              </TouchableOpacity>
              <View style={{ marginTop: 8, marginLeft: 0, width: 120 }}>
                <Text style={{ fontSize: 14, color: '#FFFFFF' }}>
                  {item.name}
                </Text>
              </View>
            </View>
        }
      </View>

    )
  }

  checkIfExerciseIsActivityDependentOrNot = (nodes, currentLeaf) => {
    if (currentLeaf.activity_id != null && currentLeaf.position_id != null && currentLeaf.activity_id == currentLeaf.position_id) {
      return true;
    }
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].children) {
        for (var j = 0; j < nodes[i].children.length; j++) {
          if (nodes[i].children[j + 1] && currentLeaf.id === nodes[i].children[j + 1].position_id && currentLeaf.id === nodes[i].children[j + 1].activity_id) {
            return true;
          }
        }
      } else {
        if (nodes[i + 1] && currentLeaf.id === nodes[i + 1].position_id && currentLeaf.id === nodes[i + 1].activity_id) {
          return true;
        }
      }
    }
    return false;
  }

  onLeafClicked = (item) => {
    // debugger;
    if (item.is_locked > 0) {
      this.setState({ isLockedBannerVisible: true });
    } else {
      this.props.navigation.navigate('Player')
    }
  }

  LockedModalBanner = () => {
    const { isLockedBannerVisible } = this.state;
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return (
        <Modal visible={isLockedBannerVisible} animationType="slide" transparent={true}
          onRequestClose={() => console.log('closed')}>
          <View style={styles.modalContainer}>
            <View style={[styles.lockedBanner, styles.activityBannerHeight]}>
              <TouchableOpacity style={styles.crossButton} onPress={() => {
                this.setState({ isLockedBannerVisible: false })
              }}>
                <BannerCloseIcon style={styles.crossIcon} color="#777778" />
              </TouchableOpacity>
              <View>
                <Image style={{ alignSelf: 'center', height: 78, width: 84, marginTop: 1 }} resizeMode='contain' source={banneractivitylockedImage} />
                <Text style={{ fontSize: 20, textAlign: 'center', paddingLeft: 40, paddingRight: 40, color: '#FFFFFF', marginTop: 20, fontFamily: Theme.FONT_BOLD }}>This exercise is still locked!</Text>
                <Text style={{ fontSize: 15, textAlign: 'center', paddingLeft: 40, paddingRight: 40, color: '#FFFFFF', marginTop: 20, fontFamily: Theme.FONT_REGULAR }}>Complete the order exercise first</Text>
              </View>
              <TouchableOpacity style={[styles.modalButton, styles.continueButton]} onPress={() => {
                this.setState({ isLockedBannerVisible: false })
              }}>
                <Text style={{ fontSize: 15, color: '#FFFFFF' }}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )
    } else {
      return (
        <Modal visible={isLockedBannerVisible} animationType="slide" transparent={true}
          onRequestClose={() => console.log('closed')}>
          <View style={styles.modalContainer}>
            <View style={[styles.lockedBanner, styles.paymentBannerHeight]}>
              <TouchableOpacity style={styles.crossButton} onPress={() => {
                this.setState({ isLockedBannerVisible: false })
              }}>
                <BannerCloseIcon style={styles.crossIcon} color="#777778" />
              </TouchableOpacity>
              <View>
                <Image style={{ alignSelf: 'center', height: 78, width: 84, marginTop: 1 }} resizeMode='contain' source={bannerpaymentlockedImage} />
                <Text style={{ fontSize: 18, textAlign: 'center', paddingLeft: 40, paddingRight: 40, color: '#FFFFFF', marginTop: 18, fontFamily: Theme.FONT_BOLD }}>This exercise is still locked!</Text>
                <Text style={{ fontSize: 15, textAlign: 'center', paddingLeft: 40, paddingRight: 40, color: '#FFFFFF', marginTop: 20, lineHeight: 22, fontFamily: Theme.FONT_REGULAR }}>To unlock this exercise checkout our attractive Price Plans</Text>
                <Text style={{ fontSize: 15, textAlign: 'center', paddingLeft: 20, paddingRight: 20, color: '#FFFFFF', marginTop: 20, fontFamily: Theme.FONT_REGULAR }}>Subscribe and get 7 Days of full access</Text>
              </View>
              <TouchableOpacity style={[styles.modalButton, styles.subscribeButton]} onPress={() => {
                this.setState({ isLockedBannerVisible: false })
                this.props.navigation.navigate('Pricing')
              }}>
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: Theme.FONT_BOLD }}>Subscribe here</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.nothanksButton]} onPress={() => {
                this.setState({ isLockedBannerVisible: false })
              }}>
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: Theme.FONT_SEMIBOLD }}>No, thanks</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )
    }
  }

  render() {
    const { isFetchingData, beingawareData } = this.props;
    const header = beingawareData.header;
    const subHeader = beingawareData.subheader;
    const imageBanner = FILES_URL + beingawareData.image_banner;
    const beingawareDatas = beingawareData.children;

    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <BottomBar screen={'beingaware'} navigation={this.props.navigation} />
        <ScrollView style={{ flexGrow: 1, marginBottom: 35 }}>

          {!isFetchingData &&
            <View>
              <ProgressiveImage
                thumbnailSource={{ uri: imageBanner }}
                source={{ uri: imageBanner }}
                style={{ width: '100%', height: 137 }}
                resizeMode="cover"
                isImageBanner={true}
              />
              <Text style={{
                textAlign: 'center',
                fontSize: 20,
                color: '#FFFFFF',
                position: 'absolute',
                top: 40,
                left: 0,
                right: 0,
                fontFamily: Theme.FONT_BOLD
              }}>{header}</Text>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                paddingTop: 8,
                color: '#FFFFFF',
                position: 'absolute',
                top: 60,
                left: 0,
                right: 0,
                paddingLeft: 30,
                paddingRight: 30,
                fontFamily: Theme.FONT_MEDIUM
              }}>{subHeader}</Text>
            </View>}

          {isFetchingData && this.loadingPage()}
          {this.renderData(beingawareDatas)}
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
    height: iPhoneX() ? height - 450 : height - 550
  },
  paymentBannerHeight: {
    height: iPhoneX() ? height - 350 : height - 450
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
    error: state.beingawareReducer.error,
    isFetchingData: state.beingawareReducer.isFetchingData,
    beingawareData: state.beingawareReducer.beingawareData
  }
}

export default connect(mapStateToProps)(BeingAware);