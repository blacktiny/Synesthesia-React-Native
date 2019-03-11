import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView, ImageBackground, FlatList, Image, TouchableOpacity, ActivityIndicator, Modal, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import BottomBar from '../components/BottomBar';
import ActivityDependentExercise from '../components/ActivityDependentExercise';
import NotActivityDependentExercise from '../components/NotActivityDependentExercise';

import { getNodeByID, clearNode } from '../actions/NodeAction'
import { setMenuItem } from '../actions/SideMenuAction'

import { iPhoneX } from '../../js/util';

const { width, height } = Dimensions.get('screen');
import { FILES_URL } from '../constants/constants'
import ExerciseModal from '../components/ExerciseModal';
import unlockActivitiesBannerImage from '../../assets/unlock_activities_banner.png';
import { Theme } from '../constants/constants'
import CustomButton from '../components/CustomButton';
import FastImage from 'react-native-fast-image';
import { removeBlur } from '../actions/BlurAction'
import { cleanProgress } from '../actions/ProgressAction'
import { setBottomBarItem } from '../actions/BottomBarAction'

class SynesthesiaItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLockedBannerVisible: false,
      completeOtherExercise: false
    }
  }
  componentDidMount() {
    this.props.dispatch(getNodeByID());
    this.props.dispatch(cleanProgress());
    this.props.dispatch(setBottomBarItem(""));
  }
  componentWillUnmount() {
    this.props.dispatch(clearNode());
  }

  loadingPage = () => {
    return (
      <View style={{ height: height - 195, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    )
  }

  renderData = () => {
    const { nodeData } = this.props;
    if (nodeData.length !== 0) {
      let arrData = [];
      if (nodeData.children[0] && nodeData.children[0].type == 'leaf') {
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
        arrData.push(this.renderContainers(nodeData.id, null, null, itemDataList));
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
          arrData.push(this.renderContainers(data.id, header, subHeader, itemList));
        });
      }
      return arrData;
    }
  }

  renderContainers = (id, header, subHeader, itemList) => {
    return (
      <View key={id}>
        {header && <View style={{ paddingLeft: 24, paddingRight: 5, paddingTop: 20 }}>
          <Text style={{ fontSize: 19, color: '#FFFFFF' }}>{header}</Text>
          <Text style={{ fontSize: 14, color: '#FFFFFF', marginTop: 5, lineHeight: 19 }}>{subHeader}</Text>
        </View>}
        <View style={{ height: 175, paddingLeft: 8, paddingTop: 0, paddingBottom: 0, marginTop: 20 }}>
          <FlatList
            data={itemList}
            contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 12, paddingRight: 12 }}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={({ item, index }) => this.renderNumber(itemList.id, itemList.length, item, index, 'videos')}
            extraData={itemList}
          />
        </View>
        <View style={{ height: 1, color: 'rgba(9,9,9, 0.26)', width: '100%', borderColor: 'rgba(9,9,9, 0.26)', borderWidth: 1, marginTop: 15, marginBottom: 15 }} />
      </View>
    )
  }

  renderNumber = (id, itemLength, item, index, type) => {
    const { nodeData, userType } = this.props;
    const nodes = nodeData.children;
    return (
      <View>

        {this.checkIfExerciseIsActivityDependentOrNot(nodes, item) ?
          <ActivityDependentExercise
            id={id}
            index={index}
            numberCount={itemLength}
            item={item}
            userType={userType}
            onPress={() => this.onLeafClicked(item)}
          /> :
          <NotActivityDependentExercise
            id={id}
            index={index}
            numberCount={itemLength}
            item={item}
            userType={userType}
            onPress={() => this.onLeafClicked(item)}
          />
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
    const { userType, navigation } = this.props;
    const isDone = item.is_done.toString()
    const backScreen = navigation.state.params.backScreen;
    if (userType == '3') {
      AsyncStorage.setItem('exerciseNodeID', item.id);
      AsyncStorage.setItem('isDone', isDone);
      this.props.navigation.navigate('Player', { backScreen: backScreen })
      return true;
    }
    if (item.is_locked != '0') {
      if (item.is_free == "1" || userType > '0') {
        this.setState({ isLockedBannerVisible: true, completeOtherExercise: true });
      } else {
        this.setState({ isLockedBannerVisible: true, completeOtherExercise: false });
      }
    } else {
      AsyncStorage.setItem('exerciseNodeID', item.id);
      AsyncStorage.setItem('isDone', isDone);
      this.props.navigation.navigate('Player', { backScreen: backScreen })
    }

  }

  render() {
    const { navigation, isFetchingData, nodeData, isLoggedIn, userType } = this.props;
    const header = nodeData.header;
    const subHeader = nodeData.subheader;
    const imageBanner = FILES_URL + nodeData.image_banner;
    const screen = navigation.state.params.backScreen;
    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <BottomBar screen={screen} navigation={this.props.navigation} />
        <ScrollView style={{ flexGrow: 1, marginBottom: 35 }}>

          {!isFetchingData && <FastImage
            style={{
              width: '100%',
              height: 137,
              display: "flex",
              alignItems: "center",
            }}
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: imageBanner }}
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
          </FastImage>}
          {isFetchingData && this.loadingPage()}
          {!isFetchingData && this.renderData()}

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
                }}>{'Meditate 7 days for free'}</Text>

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
                  title="Free Trial"
                  onPress={() => { }}
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
    error: state.nodeReducer.error,
    userType: state.loginReducer.user.user_type || '-1',
    isFetchingData: state.nodeReducer.isFetchingData,
    nodeData: state.nodeReducer.nodeData
  }
}

export default connect(mapStateToProps)(SynesthesiaItemScreen);