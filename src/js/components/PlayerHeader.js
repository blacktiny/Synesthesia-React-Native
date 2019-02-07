import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import CloseIcon from '../icons/ModalCloseIcon'
import CloseModal from './CloseModal'

const settings = require('../../assets/settings.png')
const playerBG = require('../../assets/bgPlayer.png')
const audioBg = require('../../assets/audioBg.png')

class PlayerHeader extends Component {
  state = {
    modalVisible: false,
    onSettingClicked: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible })
  }

  leave = () => {
    this.setState({ modalVisible: false })
    this.props.navigation.navigate('MindFulness')
  }

  onSettingClicked = () => {
    this.setState({ onSettingClicked: true });
  }

  render() {
    const { audioPlayer } = this.props
    const { onSettingClicked } = this.state
    return (
      <View style={styles.container}>
        <CloseModal modalVisible={this.state.modalVisible} closeModal={() => this.setModalVisible(false)} bg={audioPlayer ? audioBg : playerBG} leave={this.leave} />
        {audioPlayer && <TouchableOpacity onPress={() => console.log('Settings')} style={styles.mainView}>
          <Image source={settings} style={[{ width: 20, height: 18 }, onSettingClicked ? {opacity: 0.1}: {opacity: 1.0}]} resizeMode='contain' />
        </TouchableOpacity>}
        <TouchableOpacity onPress={() => this.setModalVisible(true)} style={styles.mainView}>
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
  textStyle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    paddingTop: 7
  },
  mainView: {
    marginTop: 3,
    marginRight: 15
  }
});

export default PlayerHeader;