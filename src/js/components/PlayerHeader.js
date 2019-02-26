import React, { Component } from 'react';
import { connect } from 'react-redux'
import { clearNode, setVolume } from '../actions/NodeAction'
import { View, Image, TouchableOpacity, StyleSheet, ImageBackground, TouchableHighlight, Text, Dimensions } from 'react-native';
import CloseIcon from '../icons/ModalCloseIcon'
import CloseModal from './CloseModal'
import { FILES_URL } from '../constants/constants'
import Slider from "react-native-slider";

const settings = require('../../assets/settings.png')
const playerBG = require('../../assets/bgPlayer.png')

class PlayerHeader extends Component {
  state = {
    modalVisible: false,
    onSettingClicked: false,
    settingsModal: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible })
  }

  settingsModalVisible = (visible) => {
    this.setState({ settingsModal: !this.state.settingsModal })
  }

  onPressLeave = () => {
    if (this.props.noBanner) {
      this.props.navigation.navigate(this.props.navigation.state.params.backScreen)
    } else {
      this.setModalVisible(true)
    }
  }
  leave = () => {
    this.setState({ modalVisible: false })
    this.props.navigation.navigate(this.props.navigation.state.params.backScreen)
  }

  onSettingClicked = () => {
    this.setState({ onSettingClicked: true });
  }

  render() {
    const { audioPlayer, exerciseBG, nodeCompleted } = this.props
    const { onSettingClicked } = this.state
    return (
      <View style={styles.container}>
        <CloseModal modalVisible={this.state.modalVisible} >
        <ImageBackground source={audioPlayer ? { uri: FILES_URL + exerciseBG } : playerBG} style={styles.containerModal}>
            <View style={styles.content}>
              <Text style={styles.text}>Are you sure you want to close this exercise?</Text>
              <View style={styles.row}>
                <TouchableHighlight style={styles.leftButton} onPress={this.leave} underlayColor={"#ffffff12"}><Text style={styles.buttonText}>Yes, close</Text></TouchableHighlight>
                <TouchableHighlight style={styles.rightButton} onPress={() => this.setModalVisible(false)} underlayColor={"#25b999cc"}><Text style={styles.buttonText}>No, continue</Text></TouchableHighlight>
              </View>
            </View>
        </ImageBackground>
       
        </CloseModal>
        <CloseModal modalVisible={this.state.settingsModal} >
          <ImageBackground source={audioPlayer ? { uri: FILES_URL + exerciseBG } : playerBG} style={styles.containerModal}>
              <View style={[styles.content, { height: "20%"}]}>
              <TouchableOpacity onPress={this.settingsModalVisible} style={styles.close}>
                <CloseIcon color="#575759" strokeWidth={2} />
              </TouchableOpacity>
              <Text style={[styles.text, { alignSelf: 'flex-start' }]}>Exercise Sound</Text>
              <Slider
                minimumValue={0}
                maximumValue={1}
                style={{width:  Dimensions.get('window').width * 0.75, marginVertical: 15 }}
                minimumTrackTintColor="#27C7A3"
                maximumTrackTintColor="#5D5D5D"
                thumbTintColor="#2BBF9E"
                step={0.01}
                value={this.props.volume}
                onValueChange={value => this.props.setVolume(value)}
              />
              </View>
          </ImageBackground>
        </CloseModal>

        {audioPlayer && <TouchableOpacity onPress={this.settingsModalVisible} style={styles.mainView}>
          <Image source={settings} style={[{ width: 20, height: 18 }, onSettingClicked ? {opacity: 0.1} : {opacity: 1.0}]} resizeMode='contain' />
        </TouchableOpacity>}
        <TouchableOpacity onPress={this.onPressLeave} style={styles.mainView}>
          <CloseIcon color="#ffffff" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative'
  },
  containerModal: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#000000'
  },
  textStyle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    paddingTop: 7
  },
  mainView: {
    padding: 5,
    marginTop: 3,
    marginRight: 15
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  content: {
    width: '90%',
    height: '30%',
    backgroundColor: '#3d3d3e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 12
  },
  text: {
    fontFamily: 'Raleway-Bold',
    lineHeight: 28,
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  },
  buttonText: {
    fontWeight: 'bold',
    lineHeight: 19,
    fontSize: 16,
    textAlign: 'center',

    color: '#FFFFFF'
  },
  leftButton: {
    width: "45%",
    height: 40,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {
    width: "45%",
    height: 40,
    borderRadius: 18,
    backgroundColor: '#25b999',
    borderColor: '#25b999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginVertical: 5 
  }
});
function mapStateToProps(state) {
  return {
    nodeCompleted: state.nodeReducer.nodeComplete,
    volume: state.nodeReducer.volume,
    exerciseBG: state.nodeReducer.exerciseNode.image_background
  }
}

export default connect(mapStateToProps, { clearNode, setVolume })(PlayerHeader);