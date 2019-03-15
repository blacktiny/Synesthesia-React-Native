import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

import BottomBar from '../components/BottomBar';
import ProgressBar from "../components/ProgressBar";

import { getUserProgress } from '../actions/ProgressAction'
import { getBottomBarItem, setBottomBarItem } from '../actions/BottomBarAction'

import { Theme } from "../constants/constants";

import { setHeaderItem } from '../actions/MeditateHeaderAction';

const backgroundImage = require("../../assets/kiwihug-266154-unsplash.png");
const closeX = require("../../assets/x.png");
import { NavigationEvents } from 'react-navigation';

const { width, height } = Dimensions.get("screen");

class ProgressScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getUserProgress());
    this.props.dispatch(getBottomBarItem());
  }

  loadingPage = () => {
    return (
      <View style={{ height: height - 195, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    )
  }

  render() {
    const { isFetchingData, progressData } = this.props;
    let { curBottomBarItem } = this.props;
    let summary = {
      minutes: 0,
      total: 0,
      completed: 0,
      percentage: 0,
      current_streak: 0,
      best_streak: 0
    };
    let exercise_category = ['Synesthesia', 'Mindfulness', 'Awareness']
    let exercise = [{
      completed: 0,
      total: 0,
      percentage: 0,
    },
    {
      completed: 0,
      total: 0,
      percentage: 0,
    },
    {
      completed: 0,
      total: 0,
      percentage: 0,
    }];

    if (progressData && !isFetchingData) {
      if (progressData != null) {
        summary = Object.assign(summary, progressData.summary);
        summary.percentage = (progressData.summary.percentage * 100).toFixed(1)
        exercise[0] = Object.assign(exercise[0], progressData['Garden of Synesthesia']);
        exercise[0].percentage = exercise[0].percentage.toFixed(1);
        exercise[1] = Object.assign(exercise[1], progressData['Path of Mindfulness']);
        exercise[1].percentage = exercise[1].percentage.toFixed(1);
        exercise[2] = Object.assign(exercise[2], progressData['Sensory Awareness']);
        exercise[2].percentage = exercise[2].percentage.toFixed(1);
      }
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        {/* <NavigationEvents onDidFocus={() => this.props.dispatch(setBottomBarItem(''))} /> */}
        <BottomBar screen={'Progress'} navigation={this.props.navigation} />
        <ScrollView style={{ flexGrow: 1, marginBottom: 35 }}>
          {isFetchingData && this.loadingPage()}
          {!isFetchingData && <ImageBackground style={styles.backgroundImage} source={backgroundImage} blurRadius={9.63}>
            <View style={styles.backgroundColor}>
            </View>

            <View style={styles.title}>
              <Text style={styles.titleText}>Your Progress</Text>
              <TouchableOpacity style={styles.crossButton} onPress={() => {
                const { curActiveScreen } = this.props;
                if (curActiveScreen) {
                  this.props.navigation.push(curActiveScreen, { backScreen: curBottomBarItem })
                  this.props.dispatch(setBottomBarItem(curBottomBarItem, ''))
                } else {
                  this.props.navigation.goBack(null);
                }

                this.props.dispatch(setHeaderItem('Sensorium'));
                // this.props.dispatch(setBottomBarItem(this.props.navigation.getParam('backScreen')));
              }}>
                <Image source={closeX} resizeMode='contain' style={{ width: 17, height: 17, justifyContent: 'flex-end', }} />
              </TouchableOpacity>
            </View>
            <View style={styles.completedSession}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#3D3D3E", "#505052"]}
                style={styles.completedSessionBack}
              >
                <Text style={styles.subTitleTextMedium}>Completed sessions</Text>
                <Text style={styles.completedPercentText}>{summary.percentage}%</Text>
                <ProgressBar value={summary.percentage} />
                <Text style={styles.completedSessionText}>{summary.completed}/{summary.total}</Text>
                <View style={styles.splitterHorizontal} />
                <Text style={styles.subTitleTextRegular}>Total minutes</Text>
                <Text style={styles.completedMinuteText}>{summary.minutes} min</Text>
              </LinearGradient>
            </View>
            <View style={styles.streak}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#3D3D3E", "#505052"]}
                style={styles.streakBack}
              >
                <View style={styles.currentStreak}>
                  <Text style={styles.subTitleTextRegular}>Current streak</Text>
                  <Text style={styles.streakText}>{summary.current_streak}</Text>
                </View>
                <View style={styles.splitterVertical} />
                <View style={styles.topStreak}>
                  <Text style={styles.subTitleTextRegular}>Top streak</Text>
                  <Text style={styles.streakText}>{summary.best_streak}</Text>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.exercise}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#3D3D3E", "#505052"]}
                style={styles.exerciseBack}
              >
                <View style={{ width: '28%' }}>
                  <Text style={styles.subTitleTextRegular2}>{exercise_category[1]}</Text>
                  <Text style={styles.completedPercentText2}>{exercise[1].percentage}%</Text>
                  <ProgressBar value={exercise[1].percentage} width={'80%'} color1={'#6F58ED'} color2={'#AEA2F2'} />
                  <Text style={styles.completedSessionText}>{exercise[1].completed}/{exercise[1].total}</Text>
                </View>
                <View style={[styles.splitterVertical, { marginRight: 15, marginLeft: 5 }]} />
                <View style={{ width: '28%' }}>
                  <Text style={styles.subTitleTextRegular2}>{exercise_category[2]}</Text>
                  <Text style={styles.completedPercentText2}>{exercise[2].percentage}%</Text>
                  <ProgressBar value={exercise[2].percentage} width={'80%'} color1={'#0060EB'} color2={'#00C2FB'} />
                  <Text style={styles.completedSessionText}>{exercise[2].completed}/{exercise[2].total}</Text>
                </View>
                <View style={[styles.splitterVertical, { marginRight: 15, marginLeft: 5 }]} />
                <View style={{ width: '28%' }}>
                  <Text style={styles.subTitleTextRegular2}>{exercise_category[0]}</Text>
                  <Text style={styles.completedPercentText2}>{exercise[0].percentage}%</Text>
                  <ProgressBar value={exercise[0].percentage} width={'80%'} />
                  <Text style={styles.completedSessionText}>{exercise[0].completed}/{exercise[0].total}</Text>
                </View>
              </LinearGradient>
            </View>
          </ImageBackground>}
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#1F1F20"
  },
  backgroundImage: {
    width: width,
    padding: 15,
    paddingTop: 10,
    alignItems: 'center'
  },
  backgroundColor: {
    position: 'absolute',
    width: width,
    height: 812,
    backgroundColor: "#1F1F1F",
    opacity: 0.68
  },
  title: {
    paddingTop: 15,
    paddingBottom: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: width - 40,
  },
  titleText: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 26,
    color: '#ffffff',
  },
  crossButton: {
    position: 'absolute',
    right: 0
  },
  completedSession: {
    width: width - 40,
    borderRadius: 12,
    marginBottom: 20,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 20 },
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 2
  },
  completedSessionBack: {
    width: width - 40,
    borderRadius: 12,
    padding: 17
  },
  subTitleTextMedium: {
    fontFamily: Theme.FONT_MEDIUM,
    fontSize: 18,
    color: '#ffffff',
  },
  subTitleTextRegular: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 18,
    color: '#ffffff',
    paddingTop: 0,
    paddingBottom: 10
  },
  subTitleTextRegular2: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 14,
    color: '#ffffff',
    paddingTop: 0,
    paddingBottom: 5
  },
  completedPercentText: {
    fontFamily: Theme.FONT_SEMIBOLD,
    fontSize: 36,
    color: '#ffffff',
    paddingTop: 15,
    paddingBottom: 10
  },
  completedPercentText2: {
    fontFamily: Theme.FONT_SEMIBOLD,
    fontSize: 18,
    color: '#ffffff',
    paddingTop: 5,
    paddingBottom: 5
  },
  completedSessionText: {
    fontFamily: Theme.FONT_LIGHT,
    fontSize: 12,
    color: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10
  },
  splitterHorizontal: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#D8D8D8',
    marginBottom: 15
  },
  completedMinuteText: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 32,
    color: '#ffffff'
  },
  streak: {
    width: width - 40,
    borderRadius: 12,
    marginBottom: 20,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 20 },
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 2
  },
  streakBack: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 17,
    justifyContent: 'center'
  },
  currentStreak: {
    width: '45%'
  },
  topStreak: {
    width: '45%'
  },
  splitterVertical: {
    width: 0.5,
    height: '80%',
    backgroundColor: '#D8D8D8',
    marginLeft: 10,
    marginRight: 20,
    marginTop: 10
  },
  streakText: {
    fontFamily: Theme.FONT_SEMIBOLD,
    fontSize: 36,
    color: '#ffffff',
    paddingTop: 5
  },
  exercise: {
    width: width - 40,
    borderRadius: 12,
    marginBottom: 20,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 20 },
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 2
  },
  exerciseBack: {
    flexDirection: 'row',
    borderRadius: 12,
    paddingLeft: 17,
    paddingTop: 17,
    paddingBottom: 17,
    justifyContent: 'center',
  }
});

function mapStateToProps(state) {
  return {
    error: state.progressReducer.error,
    isFetchingData: state.progressReducer.isFetchingData,
    progressData: state.progressReducer.progressData,
    curBottomBarItem: state.bottomBarReducer.curBottomBarItem,
    curActiveScreen: state.bottomBarReducer.curActiveScreen
  };
}

export default connect(
  mapStateToProps,
  null
)(ProgressScreen);
