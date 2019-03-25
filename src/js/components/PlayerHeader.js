import React, { Component } from 'react';
import { connect } from 'react-redux'
import { clearNode, setVolume } from '../actions/NodeAction'
import { setBackgroundSound, setBackgroundSoundVolume, stopBackgroundSoundVolume, startBackgroundSoundVolume } from '../actions/BackgroundSoundAction'
import { View, Image, TouchableOpacity, StyleSheet, TouchableHighlight, Text } from 'react-native';
import CloseIcon from '../icons/ModalCloseIcon'
import CloseModal from './CloseModal'
import { Theme } from '../constants/constants'
import { addBlur, removeBlur } from '../actions/BlurAction'

import SettingsModal from './SoundSettingsModal'

const settings = require('../../assets/settings.png')

class PlayerHeader extends Component {

  state = {
    modalVisible: false,
    onSettingClicked: false,
    settingsModal: false,
  };

  setModalVisible = (visible) => {
    if (visible) {
      this.props.addBlur()
    } else {
      this.props.removeBlur()
    }
    this.setState({ modalVisible: visible })
  }

  settingsModalVisible = () => {
    if (!this.state.settingsModal) {
      this.props.addBlur()
    } else {
      this.props.removeBlur()
    }
    this.setState({ settingsModal: !this.state.settingsModal })
  }

  onPressLeave = () => {
    if (this.props.noBanner) {
      this.props.stopBackgroundSoundVolume()
      this.props.navigation.navigate(this.props.navigation.state.params.backScreen)
    } else {
      this.setModalVisible(true)
    }
  }
  leave = () => {
    this.setState({ modalVisible: false })
    this.props.stopBackgroundSoundVolume()
    this.props.removeBlur()
    this.props.navigation.navigate(this.props.navigation.state.params.backScreen)
  }

  onSettingClicked = () => {
    this.setState({ onSettingClicked: true });
  }

  onBackgroundSoundChoosed = (sound) => {
    this.props.setBackgroundSound(sound)
  }

  onBackgroundSoundVolumeChange = (value) => {
    this.props.setBackgroundSoundVolume(value)
  }

  render() {
    const { audioPlayer } = this.props
    const { onSettingClicked } = this.state
    return (
      <View style={styles.container}>
        <CloseModal modalVisible={this.state.modalVisible} >
          <View style={styles.containerModal}>
            <View style={styles.content}>
              <Text style={styles.text}>Are you sure you want to close this exercise?</Text>
              <View style={styles.row}>
                <TouchableHighlight style={styles.leftButton} onPress={this.leave} underlayColor={"#ffffff12"}><Text style={styles.buttonText}>Yes, close</Text></TouchableHighlight>
                <TouchableHighlight style={styles.rightButton} onPress={() => this.setModalVisible(false)} underlayColor={"#25b999cc"}><Text style={styles.buttonText}>No, continue</Text></TouchableHighlight>
              </View>
            </View>
          </View>
        </CloseModal>
        <SettingsModal visible={this.state.settingsModal} onClose={this.settingsModalVisible}/>

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
    flexDirection: 'row'
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
    marginRight: 10
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  content: {
    width: '90%',
    backgroundColor: '#3d3d3e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 12
  },
  text: {
    fontFamily: Theme.FONT_BOLD,
    lineHeight: 28,
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  listText: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 18,
    lineHeight: 22,
    color: "#fff"
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
    isFetchingData: state.nodeReducer.isFetchingData
  }
}
const mapDispatchToProps = {
  clearNode,
  setVolume,
  setBackgroundSound,
  setBackgroundSoundVolume,
  stopBackgroundSoundVolume,
  startBackgroundSoundVolume,
  addBlur,
  removeBlur
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerHeader);