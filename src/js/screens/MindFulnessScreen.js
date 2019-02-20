import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, ActivityIndicator, AsyncStorage, FlatList, Dimensions, StyleSheet, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomBar from '../components/BottomBar';
import ActivityDependentExercise from '../components/ActivityDependentExercise';
import NotActivityDependentExercise from '../components/NotActivityDependentExercise';

import { getMindFulness } from '../actions/MindFulnessAction'
import { setMenuItem } from '../actions/SideMenuAction'

import BannerCloseIcon from '../icons/BannerCloseIcon';

const banneractivitylockedImage = require('../../assets/lock3.png')
const bannerpaymentlockedImage = require('../../assets/lock4.png')
import { Theme } from '../constants/constants'
import { iPhoneX } from '../../js/util';
import { FILES_URL } from '../constants/constants'
import ProgressiveImage from '../components/ProgressiveImage';

const { width, height } = Dimensions.get('screen');

class MindFulness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLockedBannerVisible: false
    }
  }

  componentDidMount() {
    this.props.dispatch(getMindFulness());
  }

  loadingPage = () => {
    return (
      <View style={{ height: height - 455, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
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
        const imageBanner = FILES_URL + data.image_banner;
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
        arrData.push(this.renderContainers(data.id, header, subHeader, imageBanner, itemList));
      });
      return arrData;
    }
  }

  renderContainers = (id, header, subHeader, imageBanner, itemList) => {
    return (
      <View key={id}>

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

        <View style={{ height: 175, paddingLeft: 8, paddingTop: 10, paddingBottom: 0 }}>
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
    const { mindfulnessData, user } = this.props;
    const nodes = mindfulnessData.children;
    const userType = user.user_type;
    return (
      <View>

        {this.checkIfExerciseIsActivityDependentOrNot(nodes, item) ?
          <ActivityDependentExercise
            id={id}
            index={index}
            numberCount={itemLength}
            item={item}
            userType={userType}
            isPreviousNodeDone={this.isPreviousNodeDone(nodes, item)}
            onPress={() => this.onLeafClicked(item)}
          /> :
          <NotActivityDependentExercise
            id={id}
            index={index}
            numberCount={itemLength}
            item={item}
            onPress={() => this.onLeafClicked(item)}
          />
        }
      </View>
    )
  }

  isPreviousNodeDone = (nodes, currentLeaf) => {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].children) {
        for (var j = 0; j < nodes[i].children.length; j++) {
          if (nodes[i].children[j].activity_id === currentLeaf.id && nodes[i].children[j].is_done) {
            return true;
          }
        }
      }
      else {
        if (nodes[i].activity_id === currentLeaf.id && nodes[i].is_done) {
          return true;
        }
      }
    }
    return false;
  }

  checkIfExerciseIsActivityDependentOrNot = (nodes, currentLeaf) => {
    // add node_id attribute on currentLeaf and make the loop with the nodes that contain that id and now with all of them
    // make it as component for one for all 3 files
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

  LockedModalBanner = () => {
    const { isLockedBannerVisible } = this.state;
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return (
        <Modal visible={isLockedBannerVisible} animationType="slide" transparent={true}
          onRequestClose={() => console.log('closed')}>
          <View style={styles.modalContainer}>
            <LinearGradient
              start={{ x: 0.17, y: 0.97 }} end={{ x: 0.67, y: 0.44 }}
              locations={[0, 1]}
              colors={['#505052', '#3D3D3E']}
              style={styles.lockedBanner}>
              <View style={{ alignItems: 'center' }}>
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
                  <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: Theme.FONT_BOLD }}>Continue</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </Modal>
      )
    } else {
      return (
        <Modal visible={isLockedBannerVisible} animationType="slide" transparent={true}
          onRequestClose={() => console.log('closed')}>
          <View style={styles.modalContainer}>
            <LinearGradient
              start={{ x: 0.17, y: 0.97 }} end={{ x: 0.67, y: 0.44 }}
              locations={[0, 1]}
              colors={['#505052', '#3D3D3E']}
              style={styles.lockedBanner}>
              <View style={{ alignItems: 'center' }}>
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
                  this.props.dispatch(setMenuItem('Pricing'))
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
            </LinearGradient>
          </View>
        </Modal>
      )
    }
  }

  onLeafClicked = (item) => {
    console.log("is locked? " + JSON.stringify(item))
    if (item.is_locked > 0) {
      this.setState({ isLockedBannerVisible: true });
    } else {
      AsyncStorage.setItem('exerciseNodeID', item.id);
      this.props.navigation.navigate('Player', { backScreen: 'MindFulness' })
    }
  }

  render() {
    const { isFetchingData, mindfulnessData } = this.props;
    const header = mindfulnessData.header;
    const subHeader = mindfulnessData.subheader;
    const imageBanner = FILES_URL + mindfulnessData.image_banner;
    const mindFulnessDatas = mindfulnessData.children;

    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <BottomBar screen={'mindfullness'} navigation={this.props.navigation} />
        <ScrollView style={{ flexGrow: 1, marginBottom: 35 }}>
          <ImageBackground
            style={{
              width: '100%',
              height: 137,
              display: "flex",
              alignItems: "center",
            }}
            resizeMode='contain'
            source={{ uri: imageBanner }}
          >
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', paddingLeft: 30, paddingRight: 30 }}>
              <Text style={{
                textAlign: 'center',
                fontSize: 20,
                color: '#FFFFFF',
                fontFamily: Theme.FONT_BOLD
              }}>{header}</Text>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                paddingTop: 8,
                color: '#FFFFFF',
                fontFamily: Theme.FONT_MEDIUM
              }}>{subHeader}</Text>
            </View>
          </ImageBackground>
          {isFetchingData && this.loadingPage()}
          {this.renderData(mindFulnessDatas)}
          {this.LockedModalBanner()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '2.5%',
    top: 0,
    flexDirection: 'row'
  },
  lockedBanner: {
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 40,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    elevation: 2,
    alignItems: 'center'
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
    user: state.loginReducer.user,
    error: state.mindfulnessReducer.error,
    isFetchingData: state.mindfulnessReducer.isFetchingData,
    mindfulnessData: state.mindfulnessReducer.mindfulnessData
  }
}

export default connect(mapStateToProps)(MindFulness);