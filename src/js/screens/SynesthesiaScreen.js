import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage, Text, View, ScrollView, Image, TouchableOpacity, FlatList, Dimensions, ImageBackground } from 'react-native';
import BottomBar from '../components/BottomBar';
import ActivityDependentExercise from '../components/ActivityDependentExercise';
import NotActivityDependentExercise from '../components/NotActivityDependentExercise';

import { getSynesthesia } from '../actions/SynesthesiaAction'
import { iPhoneX } from '../../js/util';
const { width, height } = Dimensions.get('screen');

const hearing = require('../../assets/hearing.png')
import { Theme } from '../constants/constants'
import { FILES_URL } from '../constants/constants'
import ProgressiveImage from '../components/ProgressiveImage';
import ExerciseModal from '../components/ExerciseModal';
import CustomButton from '../components/CustomButton';
import { openLoginModal, openRegisterModal } from '../actions/ToggleFormModalAction'
import { addBlur, removeBlur } from '../actions/BlurAction'

import loginAndCreateAccountBannerImage from '../../assets/login_create_account_banner.png';
import unlockActivitiesBannerImage from '../../assets/unlock_activities_banner.png';
import FastImage from 'react-native-fast-image';
import LoadingIndicator from '../components/LoadingIndicator';
import { BoxShadow } from 'react-native-shadow'
import { toggleBottomBar } from '../actions/BottomBarAction';
import { setMenuItem } from '../actions/SideMenuAction'

class Synesthesia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLockedBannerVisible: false,
      completeOtherExercise: false
    }
  }

  componentDidMount() {
    this.props.dispatch(getSynesthesia());
    this.props.dispatch(toggleBottomBar(true));
  }

  onItemButtonClicked = (id) => {
    AsyncStorage.setItem('nodeID', id);
    // this.props.navigation.navigate('SynesthesiaItem');
    this.props.navigation.push('SynesthesiaItem', { backScreen: "Synesthesia" });
  }

  renderData = (synesthesiaDatas) => {
    const { isFetchingData, isLoggedIn, userType } = this.props;
    if (synesthesiaDatas && !isFetchingData) {
      let arrData = [];
      synesthesiaDatas.map((data, i) => {
        let property = [];
        if (data.type != "leaf") {
          const header = data.header;
          const subHeader = data.subheader;
          const imageBanner = FILES_URL + data.image_banner;
          var number = 1;
          data.children.map((item) => {
            if (item.is_published == 1) {

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
            }
          })
          arrData.push(this.renderContainers(data.id, header, subHeader, imageBanner, property, i));
          if (i == 0 && (!isLoggedIn || userType == -1)) {
            let loginBanner = (
              <View key={synesthesiaDatas.length + 1} style={{
                width: width,
                height: 258,
                marginBottom: 30,
                borderRadius: 12,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 8 },
                shadowColor: "black",
                shadowOpacity: 0.47,
                elevation: 2
              }}
              >
                <FastImage style={{ width: '100%', height: '100%' }} source={loginAndCreateAccountBannerImage}>
                  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                      fontSize: 20,
                      color: '#FFFFFF',
                      textAlign: 'center',
                      position: 'absolute',
                      top: 40,
                      fontFamily: Theme.FONT_BOLD
                    }}>{'Do you want to save your \n progress?'}</Text>

                    <CustomButton
                      disabled={false}
                      style={{
                        height: 50,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 65,
                        width: 230,
                        borderRadius: 45,
                        backgroundColor: '#25B999',
                        opacity: 1
                      }}
                      title="Create a free account"
                      onPress={() => { this.props.dispatch(addBlur()); this.props.dispatch(openRegisterModal()) }}
                    />

                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15, width: 100, height: 30 }} onPress={() => { this.props.dispatch(addBlur()); this.props.dispatch(openLoginModal()) }}>
                      <Text style={{ color: '#25B999', fontSize: 16, fontFamily: Theme.FONT_BOLD }}>Log in here</Text>
                    </TouchableOpacity>

                  </View>
                </FastImage>
              </View>
            )
            arrData.push(loginBanner);
          }
        }
      });
      return arrData;
    }
  }

  renderContainers = (key, header, subHeader, imageBanner, data) => {
    return (
      <View key={key} >

        {imageBanner.includes("null") ?
          <View style={{ paddingLeft: 24, paddingRight: 5, paddingTop: 20 }}>
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

        <View style={{ paddingLeft: 8, paddingTop: imageBanner.includes("null") ? 20 : 0, paddingBottom: 15, marginTop: imageBanner.includes("null") ? 0 : 20, marginBottom: imageBanner.includes("null") ? 0 : 5 }}>
          <FlatList
            data={data}
            contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 12, paddingRight: 12 }}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={({ item, index }) => this.renderContainerItem(item.id, item, index, data.length)}
            extraData={data}
          />
        </View>
        <View style={{ height: 1, color: 'rgba(9,9,9, 0.26)', width: '100%', borderColor: 'rgba(9,9,9, 0.26)', borderWidth: 1, marginTop: 15, marginBottom: 15 }} />
      </View >
    )
  }

  renderContainerItem = (id, item, index, itemList) => {
    const { synesthesiaData, userType } = this.props;
    const nodes = synesthesiaData.children;
    const shadowOpt = {
      width: 120,
      height: 120,
      color: "#0e0d0d",
      border: 12,
      radius: 12,
      opacity: 0.6,
      x: 0,
      y: 6
    }
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
                userType={userType}
                onPress={() => this.onLeafClicked(item)}
              /> :
              <NotActivityDependentExercise
                id={id}
                index={index}
                numberCount={itemList}
                item={item}
                userType={userType}
                onPress={() => this.onLeafClicked(item)}
              />
            :
            <View style={{ width: 110, alignItems: 'center', marginTop: 20, marginLeft: 12, marginRight: 12, marginBottom: 20 }}>
              <TouchableOpacity onPress={() => { this.onItemButtonClicked(id) }}>
                <View>
                  {item.icon.includes("null") ?
                    <FastImage
                      source={hearing}
                      style={{ width: 120, height: 120 }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    :
                    <BoxShadow setting={shadowOpt}>
                      <ProgressiveImage
                        thumbnailSource={{ uri: item.icon }}
                        source={{ uri: item.icon }}
                        style={{ width: 120, height: 120, borderRadius: 12 }}
                        resizeMode="cover"
                      />
                    </BoxShadow>
                  }
                </View>
              </TouchableOpacity>
              <View style={{ marginTop: 14, marginLeft: 0, width: 120 }}>
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

  setModalVisible = (visible) => {
    this.setState({ isLockedBannerVisible: visible })
  }

  onLeafClicked = (item) => {
    const { userType } = this.props;
    const isDone = item.is_done.toString()
    if (userType == '3') {
      AsyncStorage.setItem('nodeID', item.id);
      AsyncStorage.setItem('isDone', isDone);
      this.props.navigation.navigate('Player', { backScreen: "Synesthesia" })
      return true;
    }
    if (item.is_locked != '0') {
      if (item.is_free == "1" || userType > '0') {
        this.setState({ isLockedBannerVisible: true, completeOtherExercise: true });
      } else {
        this.setState({ isLockedBannerVisible: true, completeOtherExercise: false });
      }
    } else {
      AsyncStorage.setItem('nodeID', item.id);
      AsyncStorage.setItem('isDone', isDone);
      this.props.navigation.navigate('Player', { backScreen: "Synesthesia" })
    }
  }

  render() {
    const { isFetchingData, synesthesiaData, isLoggedIn, userType } = this.props;
    const header = synesthesiaData.header;
    const subHeader = synesthesiaData.subheader;
    const imageBanner = FILES_URL + synesthesiaData.image_banner;
    const synesthesiaDatas = synesthesiaData.children;
    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        {isFetchingData && <LoadingIndicator />}
        {/* <BottomBar screen={'Synesthesia'} navigation={this.props.navigation} /> */}
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

          {this.renderData(synesthesiaDatas)}

          {!isFetchingData && isLoggedIn && userType == 0 && <View style={{
            width: width,
            height: 200,
            marginBottom: 30,
            borderRadius: 12,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            shadowColor: "black",
            shadowOpacity: 0.47,
            elevation: 2
          }}
          >
            <FastImage style={{ width: '100%', height: '100%' }} source={unlockActivitiesBannerImage}>
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                  fontSize: 20,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  position: 'absolute',
                  top: 40,
                  fontFamily: Theme.FONT_BOLD
                }}>{'All Synesthesia Meditations \n 7 days for free'}</Text>

                <CustomButton
                  disabled={false}
                  style={{
                    height: 50,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 45,
                    width: 230,
                    borderRadius: 45,
                    backgroundColor: '#25B999',
                    opacity: 1
                  }}
                  title="Start free trial"
                  onPress={() => {
                    this.props.dispatch(setMenuItem('7 days for free'))
                    this.props.navigation.navigate('Pricing')
                  }}
                />
              </View>
            </FastImage>
          </View>}

          <ExerciseModal
            modalVisible={this.state.isLockedBannerVisible}
            closeModal={() => { this.props.dispatch(removeBlur()); this.setModalVisible(false) }}
            completeOtherExercise={this.state.completeOtherExercise}
            subscribeButton={
              () => {
                this.props.dispatch(removeBlur())
                this.setModalVisible(false)
                this.props.dispatch(setMenuItem('7 days for free'))
                this.props.navigation.navigate('Pricing')
              }
            } />

        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    error: state.synesthesiaReducer.error,
    userType: state.loginReducer.user.user_type || '-1',
    isFetchingData: state.synesthesiaReducer.isFetchingData,
    synesthesiaData: state.synesthesiaReducer.synesthesiaData
  }
}

export default connect(mapStateToProps)(Synesthesia);