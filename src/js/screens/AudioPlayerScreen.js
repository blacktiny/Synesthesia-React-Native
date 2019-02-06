import React, { Component } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import ProgressPlayButton from '../components/ProgressPlayButton'
import { iPhoneX } from '../util'
import Sound from 'react-native-sound';
import { MUSIC_URL } from '../constants/constants'

Sound.setCategory('Playback');
const prev = require('../../assets/prev.png')
const next = require('../../assets/next.png')
const background = require('../../assets/audioBg.png')

class AudioPlayer extends Component {
  player
  tracker = null
  state = {
    play: true,
    currentTime: 0,
    totalTime: 0,
    progress: 0,
    loaded: false,
    url: null
  }
  componentDidMount() {
    this.initAudioPlayer()
  }
  componentWillUnmount() {
    this.player.release()
    clearInterval(this.tracker)
  }

  trackTime = () => {
    this.tracker = setInterval(() => {
      this.player.getCurrentTime((seconds) => this.setState({ currentTime: seconds }));
    }, 1000);
  }

  initAudioPlayer = () => {
    this.player = new Sound(MUSIC_URL + this.props.url, null, (error) => {
      if (error) {
        return;
      }
      this.setState({ loaded: true, totalTime: this.player.getDuration() })

      this.trackTime()

      this.player.play((success) => {
        if (success) {
          this.setState({ play: false })
        } else {
          this.player.reset();
        }
      });
    });
  }
  pressPlayButton = () => {
    const play = !this.state.play
    if (play) {
      this.player.play()
    } else {
      this.player.pause()
    }
    this.setState({ play })
  }
  secondsToMinutes = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const stringMinutes = minutes < 10 ? '0' + minutes : minutes
    const stringSeconds = seconds < 10 ? '0' + seconds : seconds
    return stringMinutes + ':' + stringSeconds;
  }
  pressNext = () => {
    const { currentTime, totalTime } = this.state
    let newTime = currentTime + 15
    if (newTime < totalTime) {
      this.player.setCurrentTime(newTime)
      this.setState({ currentTime: newTime })
    } else {
      newTime = totalTime
      this.player.stop()
      this.setState({ currentTime: 0, play: false })
    }
  }
  pressPrev = () => {
    const { currentTime, totalTime } = this.state
    let newTime = currentTime - 15
    if (newTime > 0) {
      this.player.setCurrentTime(newTime)
      this.setState({ currentTime: newTime })
    } else {
      newTime = 0
      this.player.setCurrentTime(newTime)
      this.setState({ currentTime: 0 })
    }
  }
  render() {
    const { totalTime, currentTime, loaded, play } = this.state
    return !loaded ? (
      <ImageBackground source={background} style={[styles.container, styles.indicatorStyle]}>
        <ActivityIndicator />
      </ImageBackground>
    ) : (
        <ImageBackground source={background} style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.topTextTitle}>Sound of vision</Text>
            <Text style={styles.topText}>What’s the sound of the shape?</Text>
          </View>
          <View style={styles.bottomBar}>
            <View style={styles.row}>
              <TouchableOpacity onPress={this.pressPrev}>
                <ImageBackground source={prev} style={styles.controlButton}>
                  <Text style={styles.textStyle}>15</Text>
                </ImageBackground>
              </TouchableOpacity>
              <ProgressPlayButton onPress={this.pressPlayButton} play={play} progress={(currentTime / totalTime) * 100} />
              <TouchableOpacity onPress={this.pressNext}>
                <ImageBackground source={next} style={styles.controlButton}>
                  <Text style={styles.textStyle}>15</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <Text style={[styles.textStyle, { marginVertical: iPhoneX() ? 50 : 30 }]}>{this.secondsToMinutes(currentTime)}</Text>
          </View>
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
    alignItems: 'center'
  },
  indicatorStyle: {
    justifyContent: 'center'
  },
  top: {
    paddingVertical: 30,
    paddingHorizontal: 50,
    marginTop: 15
  },
  topTextTitle: {
    fontWeight: 'bold',
    lineHeight: 35,
    fontSize: 30,
    textAlign: 'center',
    color: '#FFFFFF',
    paddingBottom: 10
  },
  topText: {
    fontWeight: '500',
    lineHeight: 24,
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  bottomBar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  controlButton: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontWeight: '600',
    lineHeight: 19,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF'
  }
});


function mapStateToProps(state) {
  return {
    url: state.musicReducer.url
  }
}

export default connect(
  mapStateToProps,
  {}
)(AudioPlayer)