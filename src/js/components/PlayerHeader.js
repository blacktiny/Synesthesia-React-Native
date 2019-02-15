import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Image, TouchableOpacity, StyleSheet, ImageBackground, TouchableHighlight, Text } from 'react-native';
import CloseIcon from '../icons/ModalCloseIcon'
import CloseModal from './CloseModal'
import { FILES_URL } from '../constants/constants'

const settings = require('../../assets/settings.png')
const playerBG = require('../../assets/bgPlayer.png')
const stars = require('../../assets/stars.png')

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
    this.props.navigation.navigate('Sensorium')
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
          {nodeCompleted ? (
            <View style={[styles.content, { height: '50%' }]}>
              <Image source={stars} style={styles.image} />
              <Text style={[styles.text, { marginVertical: 5 }]}>Well done!</Text>
              <Text style={styles.text}>Keep up your practice.{'\n'}
                  Hope to see you soon back for{'\n'}
                  Another session.
              </Text>
              <View style={[styles.row, { alignItems: 'center', justifyContent: 'center' }]}>
                <TouchableHighlight style={styles.leftButton} onPress={this.leave} underlayColor={"#ffffff12"}><Text style={styles.buttonText}>Continue</Text></TouchableHighlight>
              </View>
            </View>
            ) : (
            <View style={styles.content}>
              <Text style={styles.text}>Are you sure you want to close this exercise?</Text>
              <View style={styles.row}>
                <TouchableHighlight style={styles.leftButton} onPress={this.leave} underlayColor={"#ffffff12"}><Text style={styles.buttonText}>Yes, close</Text></TouchableHighlight>
                <TouchableHighlight style={styles.rightButton} onPress={() => this.setModalVisible(false)} underlayColor={"#25b999cc"}><Text style={styles.buttonText}>No, continue</Text></TouchableHighlight>
              </View>
            </View>
          )}
        </ImageBackground>
        </CloseModal>
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
    marginTop: 3,
    marginRight: 15
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
    fontWeight: 'bold',
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
    exerciseBG: state.nodeReducer.nodeData.image_background
  }
}

export default connect(mapStateToProps, {})(PlayerHeader);