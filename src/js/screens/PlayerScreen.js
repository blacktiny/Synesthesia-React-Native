import React, { Component } from 'react'
import { Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { connect } from 'react-redux'
import PlayButton from '../components/PlayButton'
import Button from '../components/Button'
import SettingsModal from '../components/SoundSettingsModal'
import { iPhoneX, iPhone5 } from '../util'
import { getExerciseNodeByID } from '../actions/NodeAction'
import { FILES_URL, Theme } from '../constants/constants'
import { addBlur, removeBlur } from '../actions/BlurAction'

const settings = require('../../assets/settings.png')

import { openLoginModal, openRegisterModal } from '../actions/ToggleFormModalAction'

class Player extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isFetchingData !== prevState.loading) {
      if (!nextProps.isFetchingData && prevState.loading) {
        prevState.triggerFadeAnim()
      }
      return {
        loading: nextProps.isFetchingData
      }
    }
    return null
  }
  state = {
    activeTime: 10,
    timeParams: [10, 20],
    settingsModal: false,
    triggerFadeAnim: () => setTimeout(() => this.triggerFadeAnim(), 500),
    fadeAnim: new Animated.Value(0),
    loading: this.props.isFetchingData
  }
  componentDidMount() {
    this.props.getExerciseNodeByID()
  }

  triggerFadeAnim = () => {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1500,
      }
    ).start();
  }
  onPressTime = (time) => {
    this.setState({ activeTime: time })
  }
  settingsModalVisible = () => {
    if (!this.state.settingsModal) {
      this.props.addBlur()
    } else {
      this.props.removeBlur()
    }
    this.setState({ settingsModal: !this.state.settingsModal })
  }
  renderButtons = () => {
    const { activeTime } = this.state
    return this.state.timeParams.map((time, index) => {
      return (
        <Button
          key={index}
          style={[styles.button, { borderColor: activeTime === time ? '#ffffff' : '#8b8683' }]}
          onPress={() => this.onPressTime(time)}
        >
          <Text style={[styles.buttonText, { color: activeTime === time ? '#ffffff' : '#8b8683' }]}>{time} min</Text>
        </Button>
      )
    })
  }
  onPressClick = () => {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 500,
      }
    ).start();
    setTimeout(() => {
      this.props.navigation.navigate('AudioPlayer', { backScreen: this.props.navigation.state.params.backScreen })
    }, 600);
  }
  render() {
    const { navigation, nodeData, imageBackground, isLoggedIn } = this.props
    const imageUri = FILES_URL + imageBackground
    if (this.state.loading) {
      return (
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <ImageBackground style={styles.container} source={imageBackground && { uri: imageUri }} resizeMode="cover">
        <SettingsModal visible={this.state.settingsModal} onClose={this.settingsModalVisible} />
        <View style={styles.top}>
          <Text style={styles.topTextTitle}>{nodeData.header}</Text>
          <Text style={styles.topText}>{nodeData.subheader}</Text>
        </View>
        {!isLoggedIn && <View style={styles.centralBar}>
          <Text style={styles.centralText}>Need to save your Progress?</Text>
          <View style={styles.centerRow}>
            <TouchableOpacity onPress={() => { this.props.addBlur(); this.props.openRegisterModal() }}>
              <Text style={styles.linkText}>Create free account</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>or</Text>
            <TouchableOpacity onPress={() => { this.props.addBlur(); this.props.openLoginModal() }}>
              <Text style={styles.linkText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>}
        {isLoggedIn && <Animated.View style={[styles.centralBar, { backgroundColor: 'transparent', opacity: this.state.fadeAnim }]}>
          <PlayButton onPress={this.onPressClick} />
        </Animated.View>}
        <Animated.View style={[styles.bottom, { opacity: this.state.fadeAnim }]}>
          {!isLoggedIn && [
            <PlayButton onPress={this.onPressClick} />,
            <TouchableOpacity onPress={this.onPressClick}>
              <Text style={styles.bottomText}>Play anyway</Text>
            </TouchableOpacity>]
          }
          <View style={styles.row}>
            {this.renderButtons()}
          </View>
          {this.props.showSettings && <Button onPress={this.settingsModalVisible}>
            <Image source={settings} style={styles.icon} resizeMode='contain' />
            <Text style={[styles.buttonText, styles.additionalMargin]}>Sound settings</Text>
          </Button>}
        </Animated.View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  top: {
    paddingVertical: iPhoneX() ? 30 : iPhone5() ? 7 : 15,
    paddingHorizontal: 10,
    marginTop: iPhoneX() ? 60 : 45,
  },
  topTextTitle: {
    fontFamily: Theme.FONT_BOLD,
    lineHeight: iPhoneX() ? 35 : iPhone5() ? 25 : 31,
    fontSize: iPhoneX() ? 30 : iPhone5() ? 20 : 26,
    textAlign: 'center',
    color: '#FFFFFF',
    paddingBottom: 10
  },
  topText: {
    fontFamily: Theme.FONT_MEDIUM,
    lineHeight: iPhone5() ? 18 : 24,
    fontSize: iPhone5() ? 14 : 18,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  centralBar: {
    backgroundColor: '#343230',
    paddingVertical: iPhone5() ? 15 : 30,
    paddingHorizontal: 50,
    alignItems: 'center'
  },
  centralText: {
    fontFamily: Theme.FONT_BOLD,
    lineHeight: 23,
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  linkText: {
    fontFamily: Theme.FONT_BOLD,
    lineHeight: 19,
    fontSize: 16,
    textAlign: 'center',
    color: '#25B999'
  },
  orText: {
    fontFamily: Theme.FONT_REGULAR,
    lineHeight: 19,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    paddingHorizontal: 10
  },
  bottom: {
    alignItems: 'center',
    width: '80%',
    // position: 'absolute',
    bottom: iPhoneX() ? 50 : 10
  },
  bottomText: {
    fontWeight: 'normal',
    lineHeight: 19,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 5
  },
  buttonText: {
    fontFamily: Theme.FONT_SEMIBOLD,
    lineHeight: 19,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  icon: {
    width: 20,
    height: 18
  },
  row: {
    flexDirection: 'row',
    marginTop: iPhoneX() ? 15 : 10,
    justifyContent: 'space-around'
  },
  additionalMargin: {
    marginLeft: 10
  },
  centerRow: {
    flexDirection: 'row',
    marginTop: 10
  },
  button: {
    width: '30%',
    margin: 10
  }
});

function mapStateToProps(state) {
  return {
    nodeData: state.nodeReducer.exerciseNode,
    isFetchingData: state.nodeReducer.isFetchingData,
    exercises: state.exerciseReducer.exercises,
    imageBackground: state.nodeReducer.exerciseNode.image_background,
    isLoggedIn: state.loginReducer.isLoggedIn,
    showSettings: state.nodeReducer.exerciseNode.has_background_sound
  }
}

const mapDispatchToProps = {
  getExerciseNodeByID,
  openLoginModal,
  openRegisterModal,
  addBlur,
  removeBlur
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
