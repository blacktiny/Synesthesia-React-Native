import React, { Component } from 'react';
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import { clearNode, setVolume } from '../actions/NodeAction'
import { setBackgroundSound, setBackgroundSoundVolume, stopBackgroundSoundVolume, startBackgroundSoundVolume } from '../actions/BackgroundSoundAction'
import { View, Image, TouchableOpacity, StyleSheet, Modal, Text, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import CloseIcon from '../icons/ModalCloseIcon'
import CloseModal from './CloseModal'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FILES_URL, Theme, BACKGROUND_SOUNDS } from '../constants/constants'
import Slider from "react-native-slider-custom";
import LinearGradient from 'react-native-linear-gradient'
import { removeBlur } from '../actions/BlurAction'


const settings = require('../../assets/settings.png')
const playerBG = require('../../assets/bgPlayer.png')
const volume = require('../../assets/volume.png')

class SettingsModal extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.backgroundSound !== prevState.sound) {
      return {
        sound: nextProps.backgroundSound
      }
    }
    return null
  }
  state = {
    sound: this.props.backgroundSound,
  };

  onBackgroundSoundChoosed = (sound) => {
    this.props.setBackgroundSound(sound)
  }

  onBackgroundSoundVolumeChange = debounce((value) => {
    this.props.setBackgroundSoundVolume(value)
  }, 200)

  onSoundVolumeChange = debounce((value) => {
    this.props.setVolume(value)
  }, 200)

  renderList = ({ item }) => {
    const selected = item.name === this.state.sound.name
    return (
      <TouchableOpacity onPress={() => this.onBackgroundSoundChoosed(item)} style={{ marginVertical: 5 }}>
        <View style={[styles.itemContainer, { justifyContent: selected ? 'space-between' : "flex-start" }]}>
          <Text style={[styles.listText, selected && { color: "#8D7BF0", fontFamily: Theme.FONT_BOLD }]}>{item.name}</Text>
          {selected && <Icon name="check" size={14} color="#8D7BF0" />}
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    const { onClose, visible } = this.props
    return (
      <Modal animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.containerModal}>
          <View style={[styles.content]}>
            <TouchableOpacity onPress={onClose} style={styles.close}>
              <CloseIcon color="#777778" strokeWidth={3.8} />
            </TouchableOpacity>
            <Text style={[styles.text, { alignSelf: 'flex-start' }]}>Exercise Sound</Text>
            <View style={[styles.row, { marginBottom: this.props.showSettings ? 40 : 0 }]}>
              <Image source={volume} style={{ width: 16, height: 19, marginRight: 10 }} />
              <Slider
                minimumValue={0}
                maximumValue={1}
                style={{ width: Dimensions.get('window').width * 0.7 }}
                customMinimumTrack={(
                  <LinearGradient
                    start={{ x: .74, y: .26 }}
                    end={{ x: 0, y: .77 }}
                    colors={['#27BF9E', '#84FAB0']}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                )}
                maximumTrackTintColor="#D8D8D8"
                thumbTintColor="#27BF9E"
                step={0.01}
                value={this.props.volume}
                onValueChange={this.onSoundVolumeChange}
              />
            </View>
            {this.props.showSettings && <View style={styles.backgroundSoundContainer}>
              {this.props.isLoading && <View style={styles.activityContainer}>
                <ActivityIndicator />
              </View>}
              <Text style={[styles.text, { alignSelf: 'flex-start', marginTop: 40, marginBottom: 10 }]}>Background Sound</Text>
              <FlatList
                data={BACKGROUND_SOUNDS}
                extraData={this.state.sound}
                renderItem={this.renderList}
                keyExtractor={(item, index) => item.name}
              />
              <View style={styles.row}>
                <Image source={volume} style={{ width: 16, height: 19, marginRight: 10 }} />
                <Slider
                  minimumValue={0}
                  maximumValue={1}
                  style={{ width: Dimensions.get('window').width * 0.7 }}
                  customMinimumTrack={(
                    <LinearGradient
                      start={{ x: .74, y: .26 }}
                      end={{ x: 0, y: .77 }}
                      colors={['#27BF9E', '#84FAB0']}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  )}
                  maximumTrackTintColor="#D8D8D8"
                  thumbTintColor="#27BF9E"
                  step={0.01}
                  value={this.props.backgroundSoundVolume}
                  onValueChange={this.onBackgroundSoundVolumeChange}
                />
              </View>
            </View>}
          </View>
        </View>
      </Modal>
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
    right: 20,
    padding: 5
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
  activityContainer: {
    position: 'absolute',
    height: "60%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
    top: 80
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
  },
  backgroundSoundContainer: {
    flexDirection: 'column',
    height: "45%",
    borderTopWidth: 1,
    borderTopColor: '#2E2E2F'
  },
  itemContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

function mapStateToProps(state) {
  return {
    volume: state.nodeReducer.volume,
    exerciseBG: state.nodeReducer.exerciseNode.image_background,
    backgroundSound: state.backgroundSoundReducer.sound,
    backgroundSoundVolume: state.backgroundSoundReducer.volume,
    showSettings: state.nodeReducer.exerciseNode.has_background_sound,
    isPlaying: state.backgroundSoundReducer.play,
    isLoading: state.backgroundSoundReducer.loading
  }
}
const mapDispatchToProps = {
  setVolume,
  setBackgroundSound,
  setBackgroundSoundVolume,
  stopBackgroundSoundVolume,
  startBackgroundSoundVolume,
  removeBlur
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);