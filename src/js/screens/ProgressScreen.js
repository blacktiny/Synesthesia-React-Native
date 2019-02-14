import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import BottomBar from '../components/BottomBar';
import ProgressBar from "../components/ProgressBar";

import { getUserProgress } from '../actions/ProgressAction'

import { Theme } from "../constants/constants";
import MindFulnessSaga from '../sagas/MindFulnessSaga';

const backgroundImage = require("../../assets/kiwihug-266154-unsplash.png");

const { width, height } = Dimensions.get("screen");

class ProgressScreen extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.dispatch(getUserProgress());
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
        summary = progressData.summary;
        exercise[0] = progressData['Garden of Synesthesia'];
        exercise[1] = progressData['Path of Mindfulness'];
        exercise[2] = progressData['Sensory Awareness'];
      }
    }
    
    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <BottomBar navigation={this.props.navigation} />
        <ScrollView style={{ flexGrow: 1, marginBottom: 35 }}>
          { isFetchingData && this.loadingPage() }
          { !isFetchingData && <ImageBackground style={styles.backgroundImage} source={backgroundImage} blurRadius={9.63}>
            <View style={styles.backgroundColor}>
            </View>

            <View style={styles.title}>
              <Text style={styles.titleText}>Your Progress</Text>
            </View>
            <View style={styles.completedSession}>
              <Text style={styles.subTitleTextMedium}>Completed sessoins</Text>
              <Text style={styles.completedPercentText}>{Math.floor(summary.percentage)}%</Text>
              <ProgressBar value={Math.floor(summary.percentage)}/>
              <Text style={styles.completedSessionText}>{summary.completed}/{summary.total}</Text>
              <View style={styles.splitterHorizontal} />
              <Text style={styles.subTitleTextRegular}>Total minutes</Text>
              <Text style={styles.completedMinuteText}>{summary.minutes} min</Text>
            </View> 
            <View style={styles.streak}>
              <View style={styles.currentStreak}>
                <Text style={styles.subTitleTextRegular}>Current streak</Text>
                <Text style={styles.streakText}>{summary.current_streak}</Text>
              </View>
              <View style={styles.splitterVertical} />
              <View style={styles.topStreak}>
                <Text style={styles.subTitleTextRegular}>Top streak</Text>
                <Text style={styles.streakText}>{summary.best_streak}</Text>
              </View>
            </View>
            <View style={styles.exercise}>
              <View style={{width: '28%'}}>
                <Text style={styles.subTitleTextRegular2}>{exercise_category[0]}</Text>
                <Text style={styles.completedPercentText2}>{Math.floor(exercise[0].percentage)}%</Text>
                <ProgressBar value={Math.floor(exercise[0].percentage)} width={'80%'}/>
                <Text style={styles.completedSessionText}>{exercise[0].completed}/{exercise[0].total}</Text>
              </View>
              <View style={styles.splitterVertical} />
              <View style={{width: '28%'}}>
                <Text style={styles.subTitleTextRegular2}>{exercise_category[1]}</Text>
                <Text style={styles.completedPercentText2}>{Math.floor(exercise[1].percentage)}%</Text>
                <ProgressBar value={Math.floor(exercise[1].percentage)} width={'80%'} color1={'#6F58ED'} color2={'#AEA2F2'} />
                <Text style={styles.completedSessionText}>{exercise[1].completed}/{exercise[1].total}</Text>
              </View>
              <View style={styles.splitterVertical} />
              <View style={{width: '28%'}}>
                <Text style={styles.subTitleTextRegular2}>{exercise_category[2]}</Text>
                <Text style={styles.completedPercentText2}>{Math.floor(exercise[2].percentage)}%</Text>
                <ProgressBar value={Math.floor(exercise[2].percentage)} width={'80%'} color1={'#0060EB'} color2={'#00C2FB'} />
                <Text style={styles.completedSessionText}>{exercise[2].completed}/{exercise[2].total}</Text>
              </View>
            </View>
          </ImageBackground> }
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
    height: height,
    padding: 15,
    paddingTop: 10,
    alignItems: 'center'
  },
  backgroundColor: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: "#1F1F1F",
    opacity: 0.68
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  titleText: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 26,
    color: '#ffffff'
  },
  completedSession: {
    width: width - 40,
    height: 300,
    backgroundColor: '#3F3F40',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 20 },
    shadowColor: "black",
    shadowOpacity: 0.8
  },
  subTitleTextMedium: {
    fontFamily: Theme.FONT_MEDIUM,
    fontSize: 18,
    color: '#ffffff',
    paddingTop: 10
  },
  subTitleTextRegular: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 18,
    color: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10
  },
  subTitleTextRegular2: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 14,
    color: '#ffffff',
    paddingTop: 10,
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
    fontSize: 36,
    color: '#ffffff'
  },
  streak: {
    flexDirection: 'row',
    width: width - 40,
    height: 140,
    backgroundColor: '#3F3F40',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 20 },
    shadowColor: "black",
    shadowOpacity: 0.8
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
    flexDirection: 'row',
    width: width - 40,
    height: 140,
    backgroundColor: '#3F3F40',
    borderRadius: 12,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    justifyContent: 'center',
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 20 },
    shadowColor: "black",
    shadowOpacity: 0.8
  }
});

function mapStateToProps(state) {
  return {
    error: state.progressReducer.error,
    isFetchingData: state.progressReducer.isFetchingData,
    progressData: state.progressReducer.progressData
  };
}

export default connect(
  mapStateToProps,
  null
)(ProgressScreen);
