import React, { Component } from 'react'
import {
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Image,
  Linking,
  WebView,
  Platform,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import ProgressPlayButton from '../components/ProgressPlayButton'
import { iPhoneX, iPhone5 } from '../util'
import CloseModal from '../components/CloseModal'
import { completeNode, clearNode } from '../actions/NodeAction'
import Sound from 'react-native-sound'
import { nextExercise } from '../actions/ExerciseAction'
import { FILES_URL, ITEMS_TYPES } from '../constants/constants'
import { getFileUrl } from '../helpers/getUrl'
import { getCompletionPeriod } from '../helpers/getCompletionPeriod'
import {
  getTriggerPeriod,
  getShowButton,
  getLoop,
  isYoutube,
  getVideoID,
  getTriggerStopMain,
  getTriggerFontStyle,
  getTriggersNextTrigger,
  getNextTrigger
} from '../helpers/triggerHelpers'
import getItems from '../helpers/itemsHelper'
import { checkSkipable } from '../helpers/checkSkipable'
import Button from '../components/Button'
import Video from 'react-native-video'
import YouTube from 'react-native-youtube';

Sound.setCategory('Playback');
const prev = require('../../assets/prev.png')
const next = require('../../assets/next.png')
const prevDisable = require('../../assets/prev-disable.png')
const nextDisable = require('../../assets/next-disable.png')
const warning = require('../../assets/warning.png')
const musicKey = require('../../assets/musicKey.png')
const stars = require('../../assets/stars.png')

class AudioPlayer extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.exercise !== prevState.exercise) {
      setTimeout(() => {
        prevState.setNextExercise()
      }, 500);
      return {
        exercise: nextProps.exercise,
        play: true,
        currentTime: 0,
        duration: 0,
        progress: 0,
        loaded: true,
        disableMoveBack: false,
        disableMoveForeward: false,
        showNotification: false,
        completion: getCompletionPeriod(nextProps.exercise.item_itemsets),
        fadeAnim: new Animated.Value(0),
        completionSended: false,
        prevBtnPressStatus: false,
        nextBtnPressStatus: false,
        backgroundImage: FILES_URL + nextProps.exerciseBG,
        items: getItems(nextProps.exercise.item_itemsets),
        trigger: null,
        triggerEngaged: false,
        triggerIndex: 0,
        triggerTime: null,
        triggerType: null,
        prevTriggerTime: null,
        showButton: false,
        additionalText: '',
        triggerPicture: null,
        triggerPictureShowed: false,
        triggerFadeAnim: new Animated.Value(0),
        movie: null,
        stopMain: false,
        mainType: getItems(nextProps.exercise.item_itemsets).main.item.type,
        triggerFontStyle: {},
        modalVisible: false
      }
    }
    return null
  }
  player
  tracker = null
  triggerPlayer
  constructor(props) {
    super(props);
  
    this.state = {
      exercise: props.exercise,
      play: true,
      currentTime: 0,
      duration: 0,
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
      skipable: false,
      triggerPicture: null,
      triggerPictureShowed: false,
      triggerFadeAnim: new Animated.Value(0),
      movie: null,
      setNextExercise: this.setNextExercise,
      stopMain: false,
      mainType: getItems(props.exercise.item_itemsets).main.item.type,
      triggerFontStyle: {},
      modalVisible: false
    }
  }

  componentDidMount() {
    const { items, mainType } = this.state
    this.setTrigger(items)
    if (this.props.exercisesLength > 1) {
      this.setState({ skipable: checkSkipable(items.main) })
    }
    if (mainType  === ITEMS_TYPES.audio) {
      this.initAudioPlayer()
    }
  }

  componentWillUnmount() {
    if (this.state.mainType === ITEMS_TYPES.audio) {
      this.player.stop()
      this.player.release()
    }
    clearInterval(this.tracker)
    this.props.clearNode()
  }

  trackTime = () => {
    this.tracker = setInterval(() => {
      const {
        completion,
        play,
        disableMoveBack,
        disableMoveForeward,
        trigger,
        prevTriggerTime,
        triggerTime,
        triggerIndex,
        items,
        triggerType,
        triggerFadeAnim,
        triggerPictureShowed,
        stopMain
      } = this.state
      const { completeNode, nodeCompleted } = this.props
      if (play) {
      this.player.getCurrentTime((seconds) => {
          this.setState({ currentTime: seconds })
          if (trigger && Math.floor(seconds) === triggerTime.startAt) {
            if (stopMain) {
              this.setState({ play: false })
              this.player.pause()
            }
            this.startTrigger()
          }
          if ((seconds >= completion.startAt 
            && (seconds <= completion.endAt) ) 
              || (prevTriggerTime 
                && (Math.floor(seconds) > prevTriggerTime.startAt) 
                && (Math.floor(seconds) < prevTriggerTime.startAt))) {
                  this.setState({ disableMoveBack: true })
          } else if (disableMoveBack) {
            this.setState({ disableMoveBack: false })
          }
          if ((seconds >= completion.startAt 
            && (seconds <= completion.endAt))
              || (trigger && (Math.floor(seconds) > triggerTime.startAt)
                && (Math.floor(seconds) < triggerTime.startAt))) {
                  this.setState({ disableMoveForeward: true })
          } else if (disableMoveForeward) {
            this.setState({ disableMoveForeward: false })
          }
          
          if (trigger && triggerTime.endAt && Math.floor(seconds) === triggerTime.endAt) {
            this.nextTrigger()
          }
          if (trigger && Math.floor(seconds) === triggerTime.startAt) {
            if (stopMain) {
              this.setState({ play: false })
              this.player.pause()
            }
            this.startTrigger()
          }
          if (trigger && Math.floor(seconds) >= triggerTime.startAt && ((Math.floor(seconds) <= triggerTime.endAt) || (Math.floor(seconds) <= triggerTime.endAt)) && !triggerPictureShowed ) {
            this.setState({ triggerPictureShowed: true})
            Animated.timing(
              triggerFadeAnim,
              {
                toValue: 1,
                duration: (triggerTime.fadeIn ? triggerTime.fadeIn : 0) * 1000,
              }
            ).start();
          }
          if (trigger && (Math.floor(seconds) >= triggerTime.endAt || (Math.floor(seconds) >= triggerTime.endAt)) && triggerPictureShowed ) {
            this.setState({ triggerPictureShowed: false})

            Animated.timing(
              triggerFadeAnim,
              {
                toValue: 0,
                duration: (triggerTime.fadeOut ? triggerTime.fadeOut : 0) * 1000,
              }
            ).start();
          }
          if ((seconds >= completion.startAt) && (seconds <= completion.startAt + completion.endAfter)) {
            if (!nodeCompleted) {
              completeNode()
            }
          }
        });
      }
    }, 500);
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
        stopMain: getTriggerStopMain(triggers[0]),
        showButton: getShowButton(triggers[0])
      })
    }
  }

  nextExercise = () => {
    this.setState({ loaded: false })
    clearInterval(this.tracker)
    if (this.state.mainType === ITEMS_TYPES.audio) {
      this.player.stop()
      this.player.release()
    }
    this.props.nextExercise()

  }

  setNextExercise = () => {
    const { mainType } = this.state
    this.setState({ skipable: checkSkipable(this.state.items.main) })
    this.setTrigger(this.state.items)
    if (mainType === ITEMS_TYPES.audio) {
      this.initAudioPlayer()
    }
  }
  videoPlayer = null
  nextTrigger = () => {
    const { triggers, play } = this.state.items
    const { triggerIndex, triggerTime, trigger } = this.state
    const newIndex = triggerIndex + 1
    if (!play) {
      this.play()
    }
    if (this.triggerPlayer) {
      this.triggerPlayer.stop()
      this.triggerPlayer.release()
    }
    if (newIndex > triggers.length - 1) {
      this.setState({
        trigger: null,
        triggerIndex: 0,
        prevTriggerTime: triggerTime,
        triggerTime: null,
        showButton: false,
        triggerEngaged: false,
        play: true,
        stopMain: false,
        triggerType: null
      })
    } else {
      if (getTriggersNextTrigger(trigger)) {
        let nextTrigger = getNextTrigger(trigger, triggers)
        this.setTriggerContent(nextTrigger)
        this.setState({
          trigger: nextTrigger,
          triggerIndex: newIndex,
          prevTriggerTime: triggerTime,
          triggerTime: getTriggerPeriod(nextTrigger, true, triggerTime.endAt),
          showButton: getShowButton(nextTrigger),
          play: true,
          stopMain: getTriggerStopMain(nextTrigger),
          triggerType: nextTrigger.item.type
        })
      } else {
        this.setTriggerContent(triggers[newIndex])
        this.setState({
          trigger: triggers[newIndex],
          triggerIndex: newIndex,
          prevTriggerTime: triggerTime,
          triggerTime: getTriggerPeriod(triggers[newIndex]),
          showButton: getShowButton(triggers[newIndex]),
          triggerEngaged: false,
          play: true,
          stopMain: getTriggerStopMain(triggers[newIndex]),
          triggerType: triggers[newIndex].item.type
        })
      }
    }
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
          this.setState({ additionalText: trigger.item.file, triggerFontStyle: getTriggerFontStyle(trigger) })
        break;
      case ITEMS_TYPES.audio:
          this.triggerPlayer = new Sound(FILES_URL + getFileUrl(trigger), null, (error) => {
            if (error) {
              return;
            }      
          });
      case ITEMS_TYPES.picture:
        this.setState({ triggerPicture: FILES_URL + trigger.item.file })
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
      this.setState({ loaded: true, duration: this.player.getDuration() })

      this.trackTime()

      this.play()
    })
  }

  pressPlayButton = () => {
    const { play, mainType } = this.state
    if (mainType === ITEMS_TYPES.audio) {
      if (!play) {
        this.play()
      } else {
        this.player.pause()
      }
    }
    this.setState({ play: !play })
  }

  play = () => {
    this.player.play((success) => {
      if (success) {
        this.setState({ play: false })
        if (this.props.exercisesLength > 1 && this.props.currentExerciseIndex + 1 <= this.props.exercisesLength - 1) {
          this.nextExercise()
        } else {
          this.endExercise()
        }
      } else {
        this.player.reset();
      }
    });
  }

  endExercise = () => {
    const { completeNode, nodeCompleted } = this.props
    if (this.state.completion && !nodeCompleted) {
      completeNode()
    }
    this.setState({modalVisible: true})
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
    const { currentTime, duration, disableMoveForeward, triggerEngaged, mainType, triggerTime } = this.state
    if (disableMoveForeward || triggerEngaged) {
      this.showNotification()
      return
    }
    let newTime = currentTime + 15
    
    if (newTime < duration) {
      if (triggerTime && (newTime > triggerTime.startAt)) {
        mainType === ITEMS_TYPES.audio ? this.player.setCurrentTime(triggerTime.startAt - 1) : this.player.seek(triggerTime.startAt - 1)
        this.setState({ currentTime: newTime - 1 })
      } else {
        mainType === ITEMS_TYPES.audio ? this.player.setCurrentTime(newTime) : this.player.seek(newTime)
        this.setState({ currentTime: newTime })
      }
    } else {
      newTime = duration
      mainType === ITEMS_TYPES.audio ? this.player.stop() : this.player.paused = true

      this.setState({ currentTime: 0, play: false })
      if (this.props.exercisesLength > 1 && this.props.currentExerciseIndex + 1 <= this.props.exercisesLength - 1) {
        this.nextExercise()
      } else {
        this.endExercise()
      }
    }
  }

  pressPrev = () => {
    const { currentTime, disableMoveBack, triggerEngaged, mainType, prevTriggerTime } = this.state
    if (disableMoveBack || triggerEngaged) {
      this.showNotification()
      return
    }
    let newTime = currentTime - 15
    if (newTime > 0) {
      if (prevTriggerTime && (newTime < prevTriggerTime.startAt)) {
        mainType === ITEMS_TYPES.audio ? this.player.setCurrentTime(newTime - 1) : this.player.seek(newTime - 1)
        this.setState({ currentTime: newTime - 1 })
      }
      mainType === ITEMS_TYPES.audio ? this.player.setCurrentTime(newTime) : this.player.seek(newTime)
      this.setState({ currentTime: newTime })
    } else {
      newTime = 0
      mainType === ITEMS_TYPES.audio ? this.player.setCurrentTime(newTime) : this.player.seek(newTime)
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

  onLoad = ({duration}) => {
    this.setState({ duration })
  }

  onProgress = ({ currentTime }) => {
    this.setState({ currentTime })
  }

  onEnd = ({ state }) => {
    this.setState({ skipable: state === 'ended' })
  }

  onVideoEnd = () => {
    if (this.props.exercisesLength > 1 && this.props.currentExerciseIndex + 1 <= this.props.exercisesLength - 1) {
      this.nextExercise()
    } else {
      this.endExercise()
    }
  }

  onLeave = () => {
    this.setState({ modalVisible: false })
    this.props.navigation.navigate(this.props.navigation.state.params.backScreen)
  }
  onShouldStartLoadWithRequest = (navigator) => {
    if (navigator.url.indexOf('embed') !== -1
    ) {
        return true;
    } else {
        this.videoPlayer.stopLoading(); //Some reference to your WebView to make it stop loading that URL
        return false;
    }    
  }
  render() {
    const {
      duration,
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
      skipable,
      triggerPicture,
      triggerFadeAnim,
      mainType,
      trigger,
      stopMain,
      triggerFontStyle,
      triggerTime,
      showButton
    } = this.state
    const { exercise } = this.props
    return !loaded ? (
      <ImageBackground source={{uri: backgroundImage}} style={[styles.container, styles.indicatorStyle]}>
        <ActivityIndicator />
      </ImageBackground>
    ) : (
        <ImageBackground source={{uri: backgroundImage}} style={styles.container}>
        <CloseModal modalVisible={this.state.modalVisible} >
        <ImageBackground source={{ uri: backgroundImage }} style={styles.containerModal}>
            <View style={[styles.content, { height: '50%' }]}>
              <Image source={stars} style={styles.image} />
              <Text style={[styles.text, { marginVertical: 5 }]}>Well done!</Text>
              <Text style={styles.text}>Keep up your practice.{'\n'}
                  Hope to see you soon back for{'\n'}
                  Another session.
              </Text>
              <View style={styles.modalRow}>
                <TouchableHighlight style={styles.leftButton} onPress={this.onLeave} underlayColor={"#ffffff12"}><Text style={styles.buttonText}>Continue</Text></TouchableHighlight>
              </View>
            </View>
      
        </ImageBackground>
        </CloseModal>
          <View style={styles.top}>
            <Text style={styles.topTextTitle}>{exercise.header}</Text>
            {exercise.subheader !== '' && <Text style={styles.topText}>{exercise.subheader}</Text>}
          </View>
          <View style={styles.centralBar}>
          {triggerEngaged && triggerType === ITEMS_TYPES.audio && (
              <View style={styles.column}>
                <Image source={musicKey}/>
                <Button onPress={this.nextTrigger} style={styles.button}>
                  <Text style={styles.topText}>Resume</Text>
                </Button>
              </View>
            )}
            {triggerEngaged && triggerType === ITEMS_TYPES.text && (
              <Animated.View style={[styles.animatedViewPicture, { opacity: triggerTime.fadeIn ? triggerFadeAnim : 1 }]}>
              <View style={styles.column}>
                <Text style={[styles.topText, triggerFontStyle]}>{additionalText}</Text>
                {showButton && <Button onPress={this.nextTrigger} style={styles.button}>
                  <Text style={styles.topText}>Resume</Text>
                </Button>}
              </View>
              </Animated.View>)}
             {triggerType === ITEMS_TYPES.picture && <Animated.View style={[styles.animatedViewPicture, { opacity: triggerTime.fadeIn ? triggerFadeAnim : 1 }]}>
                <Image source={{uri: triggerPicture }} style={{width: "100%", height: '100%' }} resizeMode='contain' />
              </Animated.View>}
              {triggerType === ITEMS_TYPES.movie && isYoutube(trigger) && triggerEngaged && (
                <View style={styles.animatedViewPicture}>
                 {Platform.OS === 'ios' ? <YouTube
                    ref={component => {
                      this._youTubeRef = component;
                    }}
                    apiKey="AIzaSyDbNjPBzRia3bFQCX3XKIVn61L8OM2PmXc"
                    play={false}
                    videoId={getVideoID(trigger)}
                    controls={1}
                    style={[{ height: 150, width: Dimensions.get('window').width }]}
                    onError={e => console.warn(e.error)}
                    onChangeState={this.onEnd}
                  /> : 
                  [<WebView
                    style={{ width: Dimensions.get('window').width, height: 150 }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: "https://www.youtube.com/embed/" + getVideoID(trigger) }}
                  />,
                  <Button onPress={this.onVideoEnd} style={styles.button}>
                  <Text style={styles.topText}>Skip</Text>
                </Button>]}
                </View>
              )}
              {mainType === ITEMS_TYPES.movie && (
                <View style={styles.animatedViewPicture}>
                  <Video ref={(ref) => { this.player = ref }} source={{uri:  FILES_URL + getFileUrl(this.state.items.main) }} onEnd={this.onVideoEnd} paused={!play} onProgress={this.onProgress} onLoad={this.onLoad} style={styles.video} />
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
            {skipable && <View style={styles.animatedView}>
              <Button onPress={this.onVideoEnd} style={styles.button}>
                  <Text style={styles.topText}>Skip</Text>
                </Button>
            </View>}
            {this.state.items.main.item.credit === '1' && <View style={styles.modalRow}>
                <TouchableHighlight onPress={() => Linking.openURL(this.state.items.main.item.credit_link) }>
                  <Text style={styles.textLink}>
                    {this.state.items.main.item.credit_text}
                  </Text>
                </TouchableHighlight>
            </View>}
            <View style={styles.row}>
              <TouchableHighlight style={{borderRadius: 30}} onPress={this.pressPrev} onHideUnderlay={() => this.onHideUnderlay('prev')} onShowUnderlay={() => this.onShowUnderlay('prev')} underlayColor={'#0000004c'}>
                <ImageBackground source={(disableMoveBack || triggerEngaged) ? prevDisable : prev} style={styles.controlButton}>
                  <Text style={[styles.textStyle, (disableMoveBack || triggerEngaged)  && { color: '#313331' }, {opacity: prevBtnPressStatus ? 0.7 : 1.0}]}>15</Text>
                </ImageBackground>
              </TouchableHighlight>
              <ProgressPlayButton onPress={() => this.pressPlayButton()} play={play} progress={(currentTime / duration) * 100} disabled={(stopMain && triggerEngaged)} />
              <TouchableHighlight style={{borderRadius: 30}} onPress={this.pressNext} onHideUnderlay={() => this.onHideUnderlay('next')} onShowUnderlay={() => this.onShowUnderlay('next')} underlayColor={'#0000004c'}>
                <ImageBackground source={(disableMoveForeward || triggerEngaged) ? nextDisable : next} style={styles.controlButton}>
                  <Text style={[styles.textStyle, (disableMoveForeward || triggerEngaged) && { color: '#313331' }, {opacity: nextBtnPressStatus ? 0.7 : 1.0}]}>15</Text>
                </ImageBackground>
              </TouchableHighlight>
            </View>
            <Text style={[styles.textStyle, { marginVertical: iPhoneX() ? 50 : 30 }]}>{this.secondsToMinutes(duration - currentTime)}</Text>
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
    paddingVertical: iPhoneX() ? 30 : iPhone5() ? 7 : 15,
    paddingHorizontal: 10,
    marginTop: iPhoneX() ? 15 : 0,
    alignItems: 'center'
  },
  topTextTitle: {
    fontWeight: 'bold',
    lineHeight: iPhoneX() ? 35 : iPhone5() ? 25 : 31,
    fontSize: iPhoneX() ? 30 : iPhone5() ? 20 : 26,
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
    width: '85%',
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
    height: 56,
    alignItems: 'center',
    justifyContent: 'center'
  },
  animatedViewPicture: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: '50%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centralBar: {
    width: "100%",
    height: "25%",
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
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
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20
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
  image: {
    marginVertical: 5 
  },
  textLink: {
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
    color: 'white',
    textDecorationLine: 'underline',
    margin: 5
  }
});


function mapStateToProps(state) {
  return {
    exercise: state.exerciseReducer.currentExercise,
    nodeCompleted: state.nodeReducer.nodeComplete,
    exerciseBG: state.nodeReducer.exerciseNode.image_background,
    exercisesLength: state.exerciseReducer.exercisesLength,
    currentExerciseIndex: state.exerciseReducer.currentExerciseIndex
  }
}
const mapDispatchToProps = {
  completeNode,
  nextExercise,
  clearNode
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioPlayer)