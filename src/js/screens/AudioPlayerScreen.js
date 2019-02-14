import React, { Component } from 'react'
import { Text, View, ImageBackground, TouchableHighlight, StyleSheet, ActivityIndicator, Animated, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';

import ProgressPlayButton from '../components/ProgressPlayButton'
import { iPhoneX } from '../util'
import { completeNode } from '../actions/NodeAction'
import Sound from 'react-native-sound';
import { FILES_URL } from '../constants/constants'
import { getMusicUrl } from '../helpers/getUrl'
import { getCompletionPeriod } from '../helpers/getCompletionPeriod'
import { doCompletion } from '../api/api'
Sound.setCategory('Playback');
const prev = require('../../assets/prev.png')
const next = require('../../assets/next.png')
const prevDisable = require('../../assets/prev-disable.png')
const nextDisable = require('../../assets/next-disable.png')
const warning = require('../../assets/warning.png')
const background = require('../../assets/audioBg.png')

class AudioPlayer extends Component {
  
  player
  tracker = null

  constructor() {
    super();
  
    this.state = {
      play: true,
      currentTime: 0,
      totalTime: 0,
      progress: 0,
      loaded: false,
      disableMove: false,
      showNotification: false,
      completion: getCompletionPeriod(this.props.exercise.item_itemsets),
      fadeAnim: new Animated.Value(0),
      completionSended: false,
      prevBtnPressStatus: false,
      nextBtnPressStatus: false
    }
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
      const { completion } = this.state
      const { completeNode, nodeCompleted } = this.props
      this.player.getCurrentTime((seconds) => {
        this.setState({ currentTime: seconds })
        if ((seconds >= completion.startAt) && (seconds <= completion.startAt + completion.endAfter)) {
          this.setState({ disableMove: true })
          if (!nodeCompleted) {
            completeNode()
          }
        } else if ((seconds > completion.startAt + completion.endAfter)) {
          this.setState({ disableMove: false })
        }
      });
    }, 1000);
  }

  initAudioPlayer = () => {
    this.player = new Sound(FILES_URL + getMusicUrl(this.props.exercise.item_itemsets), null, (error) => {
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
    const {play} = this.state
    if (play) {
      this.player.play()
    } else {
      this.player.pause()
    }
    this.setState({ play: !play })
  }

  secondsToMinutes = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const stringMinutes = minutes < 10 ? '0' + minutes : minutes
    const stringSeconds = seconds < 10 ? '0' + seconds : seconds
    return stringMinutes + ':' + stringSeconds;
  }

  showNotification = () => {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 500,
      }
    ).start();
    setTimeout(() => {
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 0,
          duration: 500,
        }
      ).start();
    }, 2000);
  }

  pressNext = () => {
    const { currentTime, totalTime, disableMove } = this.state
    if (disableMove) {
      this.showNotification()
      return
    }
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
    const { currentTime, disableMove } = this.state
    if (disableMove) {
      this.showNotification()
      return
    }
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

  onHideUnderlay(itemName) {
    if (itemName == 'prev') {
      this.setState({ prevBtnPressStatus: false });
    } else if (itemName == 'next') {
      this.setState({ nextBtnPressStatus: false });
    }
  }

  onShowUnderlay(itemName) {
    if (itemName == 'prev') {
      this.setState({ prevBtnPressStatus: true });
    } else if (itemName == 'next') {
      this.setState({ nextBtnPressStatus: true });
    }
  }

  render() {
    const { totalTime, currentTime, loaded, play, disableMove, fadeAnim, prevBtnPressStatus, nextBtnPressStatus } = this.state
    const { exercise } = this.props

    return !loaded ? (
      <ImageBackground source={background} style={[styles.container, styles.indicatorStyle]}>
        <ActivityIndicator />
      </ImageBackground>
    ) : (
        <ImageBackground source={background} style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.topTextTitle}>{exercise.header}</Text>
            <Text style={styles.topText}>{exercise.subheader}</Text>
          </View>
          <View style={styles.bottomBar}>
            <Animated.View style={[styles.animatedView, { opacity: fadeAnim }]}>
              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={['#505052', '#3D3D3E']}
                style={styles.linearGradient}>
                <Image source={warning} style={{ marginRight: 20, marginLeft: 10 }} />
                <Text style={styles.buttonText}>
                  You can’t move at the moment!
              </Text>
              </LinearGradient>
            </Animated.View>

            <View style={styles.row}>
              <TouchableHighlight style={{borderRadius: 30}} onPress={this.pressPrev} onHideUnderlay={() => this.onHideUnderlay('prev')} onShowUnderlay={() => this.onShowUnderlay('prev')} underlayColor={'#0000004c'}>
                <ImageBackground source={disableMove ? prevDisable : prev} style={styles.controlButton}>
                  <Text style={[styles.textStyle, disableMove && { color: '#313331' }, {opacity: prevBtnPressStatus ? 0.7 : 1.0}]}>15</Text>
                </ImageBackground>
              </TouchableHighlight>
              <ProgressPlayButton onPress={() => this.pressPlayButton()} play={play} progress={(currentTime / totalTime) * 100} />
              <TouchableHighlight style={{borderRadius: 30}} onPress={this.pressNext} onHideUnderlay={() => this.onHideUnderlay('next')} onShowUnderlay={() => this.onShowUnderlay('next')} underlayColor={'#0000004c'}>
                <ImageBackground source={disableMove ? nextDisable : next} style={styles.controlButton}>
                  <Text style={[styles.textStyle, disableMove && { color: '#313331' }, {opacity: nextBtnPressStatus ? 0.7 : 1.0}]}>15</Text>
                </ImageBackground>
              </TouchableHighlight>
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
    paddingTop: 100,
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
  },
  animatedView: {
    position: 'absolute',
    width: '85%',
    height: 56
  },
  linearGradient: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 35,
    height: 56
  },
  buttonText: {
    fontSize: 17,
    color: '#FFFFFF',
    letterSpacing: 0,
  }
});


function mapStateToProps(state) {
  return {
    exercise: state.exerciseReducer.currentExercise,
    nodeCompleted: state.nodeReducer.nodeComplete
  }
}
const mapDispatchToProps = {
  completeNode
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioPlayer)