import React, { Component } from 'react'
import { Text, View, ImageBackground, TouchableHighlight, StyleSheet, ActivityIndicator, Animated, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import ProgressPlayButton from '../components/ProgressPlayButton'
import { iPhoneX } from '../util'
import { completeNode } from '../actions/NodeAction'
import Sound from 'react-native-sound';
import { FILES_URL, ITEMS_TYPES } from '../constants/constants'
import { getFileUrl } from '../helpers/getUrl'
import { getCompletionPeriod } from '../helpers/getCompletionPeriod'
import { getTriggerPeriod, getShowButton, getLoop } from '../helpers/triggerHelpers'
import getItems from '../helpers/itemsHelper'
import Button from '../components/Button'


Sound.setCategory('Playback');
const prev = require('../../assets/prev.png')
const next = require('../../assets/next.png')
const prevDisable = require('../../assets/prev-disable.png')
const nextDisable = require('../../assets/next-disable.png')
const warning = require('../../assets/warning.png')
const musicKey = require('../../assets/musicKey.png')

class AudioPlayer extends Component {
  
  player
  tracker = null
  triggerPlayer
  constructor(props) {
    super(props);
  
    this.state = {
      play: true,
      currentTime: 0,
      totalTime: 0,
      progress: 0,
      loaded: false,
      disableMoveBack: false,
      disableMoveForeward: false,
      showNotification: false,
      completion: getCompletionPeriod(props.exercise.item_itemsets),
      fadeAnim: new Animated.Value(0),
      completionSended: false,
      prevBtnPressStatus: false,
      nextBtnPressStatus: false,
      backgroundImage: FILES_URL + props.exerciseBG,
      items: getItems(props.exercise.item_itemsets),
      trigger: null,
      triggerEngaged: false,
      triggerIndex: 0,
      triggerTime: null,
      triggerType: null,
      prevTriggerTime: null,
      showButton: false,
      additionalText: '',
    }
  }

  componentDidMount() {
    this.setTrigger(this.state.items)
    this.initAudioPlayer()
  }

  componentWillUnmount() {
    this.player.stop()
    this.player.release()
    clearInterval(this.tracker)
  }

  trackTime = () => {
    this.tracker = setInterval(() => {
      const { completion, play, disableMoveBack, disableMoveForeward, trigger, prevTriggerTime, triggerTime, triggerIndex, items } = this.state
      const { completeNode, nodeCompleted } = this.props
      if (play) {
      this.player.getCurrentTime((seconds) => {
          this.setState({ currentTime: seconds })
          if ((seconds >= completion.startAt 
            && (seconds - 15 <= completion.startAt + completion.endAfter) ) 
              || (prevTriggerTime 
                && (Math.floor(seconds) > prevTriggerTime) 
                && (Math.floor(seconds) - 15 < prevTriggerTime))) {
                  this.setState({ disableMoveBack: true })
          } else if (disableMoveBack) {
            this.setState({ disableMoveBack: false })
          }
          if ((seconds + 15 >= completion.startAt 
            && (seconds <= completion.startAt + completion.endAfter))
              || (trigger && (Math.floor(seconds) + 15 > triggerTime)
                && (Math.floor(seconds) < triggerTime))) {
                  this.setState({ disableMoveForeward: true })
          } else if (disableMoveForeward) {
            this.setState({ disableMoveForeward: false })
          }
          if (trigger && Math.floor(seconds) === triggerTime && items.triggers[triggerIndex + 1]) {
            this.setState({ play: false })
            this.player.pause()
            this.startTrigger()
          }
          if ((seconds >= completion.startAt) && (seconds <= completion.startAt + completion.endAfter)) {
            if (!nodeCompleted) {
              completeNode()
            }
          }
        });
      }
    }, 1000);
  }

  setTrigger = (items) => {
    const { triggers } = this.state.items
    if (triggers.length !== 0) {
      this.setTriggerContent(triggers[0])
      this.setState({
        trigger: triggers[0],
        triggerIndex: 0,
        triggerTime: getTriggerPeriod(triggers[0]),
        triggerType: triggers[0].item.type,
        showButton: getShowButton(triggers[0])
      })
    }
  }

  nextTrigger = () => {
    const { triggers } = this.state.items
    const { triggerIndex, triggerTime } = this.state
    const newIndex = triggerIndex + 1
    this.play()
    if (this.triggerPlayer) {
      this.triggerPlayer.stop()
      this.triggerPlayer.release()
    }
    this.setTriggerContent(triggers[newIndex])
    this.setState({
      trigger: triggers[newIndex],
      triggerIndex: newIndex,
      prevTriggerTime: triggerTime,
      triggerTime: getTriggerPeriod(triggers[newIndex]),
      showButton: getShowButton(triggers[newIndex]),
      triggerEngaged: false,
      play: true,
      triggerType: triggers[newIndex].item.type
    })
  }

  setLoop = () => {
    const loop = getLoop(this.state.trigger)
    this.triggerPlayer.play((success) => {
      if (success) {
        this.triggerPlayer.pause()
        if (loop){
          this.triggerPlayer.setCurrentTime(0)
          setTimeout(() => {
            this.setLoop()
          }, loop);
        }
      } else {
        this.triggerPlayer.reset();
      }
    });
  }

  startTrigger = () => {
    const { trigger } = this.state
    switch (trigger.item.type) {
      case ITEMS_TYPES.text:
          this.setState({ additionalText: trigger.item.file })
        break;
      case ITEMS_TYPES.audio:
          this.setLoop()
        break;
      default:
        break;
    }
    this.setState({triggerEngaged: true})
  }

  setTriggerContent = (trigger) => {
    switch (trigger.item.type) {
      case ITEMS_TYPES.text:
          this.setState({ additionalText: trigger.item.file })
        break;
      case ITEMS_TYPES.audio:
          this.triggerPlayer = new Sound(FILES_URL + getFileUrl(trigger), null, (error) => {
            if (error) {
              return;
            }      
          });
        break;
      default:
        break;
    }
  }
  
  initAudioPlayer = () => {
    this.player = new Sound(FILES_URL + getFileUrl(this.state.items.main), null, (error) => {
      if (error) {
        return;
      }
      this.setState({ loaded: true, totalTime: this.player.getDuration() })

      this.trackTime()

      this.play()
    })
  }

  pressPlayButton = () => {
    const {play} = this.state
    if (!play) {
      this.play()
    } else {
      this.player.pause()
    }
    this.setState({ play: !play })
  }
  play = () => {
    this.player.play((success) => {
      if (success) {
        this.setState({ play: false })
      } else {
        this.player.reset();
      }
    });
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
    const { currentTime, totalTime, disableMoveForeward, triggerEngaged } = this.state
    if (disableMoveForeward || triggerEngaged) {
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
    const { currentTime, disableMoveBack, triggerEngaged } = this.state
    if (disableMoveBack || triggerEngaged) {
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
    const {
      totalTime,
      currentTime,
      loaded,
      play,
      disableMoveForeward,
      disableMoveBack, 
      fadeAnim,
      prevBtnPressStatus,
      nextBtnPressStatus,
      backgroundImage,
      triggerType,
      triggerEngaged,
      additionalText,
      showButton
    } = this.state
    const { exercise } = this.props
    return !loaded ? (
      <ImageBackground source={{uri: backgroundImage}} style={[styles.container, styles.indicatorStyle]}>
        <ActivityIndicator />
      </ImageBackground>
    ) : (
        <ImageBackground source={{uri: backgroundImage}} style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.topTextTitle}>{exercise.header}</Text>
            <Text style={styles.topText}>{exercise.subheader}</Text>
            {triggerEngaged && triggerType === ITEMS_TYPES.text && (
              <View style={styles.column}>
                <Text style={styles.topText}>{additionalText}</Text>
                <Button onPress={this.nextTrigger} style={styles.button}>
                  <Text style={styles.topText}>Resume</Text>
                </Button>
              </View>)}
            {triggerEngaged && triggerType === ITEMS_TYPES.audio && (
              <View style={styles.column}>
                <Image source={musicKey}/>
                <Button onPress={this.nextTrigger} style={styles.button}>
                  <Text style={styles.topText}>Resume</Text>
                </Button>
              </View>
            )}
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
                <ImageBackground source={(disableMoveBack || triggerEngaged) ? prevDisable : prev} style={styles.controlButton}>
                  <Text style={[styles.textStyle, (disableMoveBack || triggerEngaged)  && { color: '#313331' }, {opacity: prevBtnPressStatus ? 0.7 : 1.0}]}>15</Text>
                </ImageBackground>
              </TouchableHighlight>
              <ProgressPlayButton onPress={() => this.pressPlayButton()} play={play} progress={(currentTime / totalTime) * 100} disabled={triggerEngaged} />
              <TouchableHighlight style={{borderRadius: 30}} onPress={this.pressNext} onHideUnderlay={() => this.onHideUnderlay('next')} onShowUnderlay={() => this.onShowUnderlay('next')} underlayColor={'#0000004c'}>
                <ImageBackground source={(disableMoveForeward || triggerEngaged) ? nextDisable : next} style={styles.controlButton}>
                  <Text style={[styles.textStyle, (disableMoveForeward || triggerEngaged) && { color: '#313331' }, {opacity: nextBtnPressStatus ? 0.7 : 1.0}]}>15</Text>
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
    paddingHorizontal: 20,
    marginTop: 15,
    alignItems: 'center'
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
    lineHeight: 25,
    fontSize: 16,
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
  column: {
    marginVertical: 20,
    flexDirection: 'column',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
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
  },
  button: {
    width: 136,
    margin: 10
  }
});


function mapStateToProps(state) {
  return {
    exercise: state.exerciseReducer.currentExercise,
    nodeCompleted: state.nodeReducer.nodeComplete,
    exerciseBG: state.nodeReducer.exerciseNode.image_background
  }
}
const mapDispatchToProps = {
  completeNode
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioPlayer)