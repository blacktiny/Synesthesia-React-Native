import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView
} from "react-native";
import { connect } from "react-redux";

import ProgressBar from "../components/ProgressBar";

import { Theme } from "../constants/constants";

const backgroundImage = require("../../assets/kiwihug-266154-unsplash.png");

const { width, height } = Dimensions.get("screen");

class ProgressScreen extends Component {
  constructor() {
    super();

    this.state = {
      totalSession: 153,
      completedSession: 53,
      totalMinutes: 20,
      currentStreak: 2,
      topStreak: 5,
      exercise: [
        {
          name: 'Synesthesia',
          completed: 9,
          total: 43
        },
        {
          name: 'Mindfulness',
          completed: 29,
          total: 43
        },
        {
          name: 'Awareness',
          completed: 19,
          total: 43
        }
      ]
    };
  }

  render() {
    const { totalSession, completedSession, totalMinutes, currentStreak, topStreak, exercise } = this.state;
    return (
      <ScrollView
        style={styles.main}
        scrollEnabled={true}
      >
        <ImageBackground style={styles.backgroundImage} source={backgroundImage} blurRadius={9.63}>
          <View style={styles.backgroundColor}>
          </View>
          
          <View style={styles.title}>
            <Text style={styles.titleText}>Your Progress</Text>
          </View>
          <View style={styles.completedSession}>
            <Text style={styles.subTitleTextMedium}>Completed sessoins</Text>
            <Text style={styles.completedPercentText}>{Math.floor(completedSession * 100 / totalSession)}%</Text>
            <ProgressBar value={Math.floor(completedSession * 100 / totalSession)}/>
            <Text style={styles.completedSessionText}>{completedSession}/{totalSession}</Text>
            <View style={styles.splitterHorizontal} />
            <Text style={styles.subTitleTextRegular}>Total minutes</Text>
            <Text style={styles.completedMinuteText}>{totalMinutes} min</Text>
          </View>
          <View style={styles.streak}>
            <View style={styles.currentStreak}>
              <Text style={styles.subTitleTextRegular}>Current streak</Text>
              <Text style={styles.streakText}>{currentStreak}</Text>
            </View>
            <View style={styles.splitterVertical} />
            <View style={styles.topStreak}>
              <Text style={styles.subTitleTextRegular}>Top streak</Text>
              <Text style={styles.streakText}>{topStreak}</Text>
            </View>
          </View>
          <View style={styles.exercise}>
            <View style={{width: '28%'}}>
              <Text style={styles.subTitleTextRegular2}>{exercise[0].name}</Text>
              <Text style={styles.completedPercentText2}>{Math.floor(exercise[0].completed * 100 / exercise[0].total)}%</Text>
              <ProgressBar value={Math.floor(exercise[0].completed * 100 / exercise[0].total)} width={'80%'}/>
              <Text style={styles.completedSessionText}>{exercise[0].completed}/{exercise[0].total}</Text>
            </View>
            <View style={styles.splitterVertical} />
            <View style={{width: '28%'}}>
              <Text style={styles.subTitleTextRegular2}>{exercise[1].name}</Text>
              <Text style={styles.completedPercentText2}>{Math.floor(exercise[1].completed * 100 / exercise[1].total)}%</Text>
              <ProgressBar value={Math.floor(exercise[1].completed * 100 / exercise[1].total)} width={'80%'} color1={'#6F58ED'} color2={'#AEA2F2'} />
              <Text style={styles.completedSessionText}>{exercise[1].completed}/{exercise[1].total}</Text>
            </View>
            <View style={styles.splitterVertical} />
            <View style={{width: '28%'}}>
              <Text style={styles.subTitleTextRegular2}>{exercise[2].name}</Text>
              <Text style={styles.completedPercentText2}>{Math.floor(exercise[2].completed * 100 / exercise[2].total)}%</Text>
              <ProgressBar value={Math.floor(exercise[2].completed * 100 / exercise[2].total)} width={'80%'} color1={'#0060EB'} color2={'#00C2FB'} />
              <Text style={styles.completedSessionText}>{exercise[2].completed}/{exercise[2].total}</Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
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
  return {};
}

export default connect(
  mapStateToProps,
  null
)(ProgressScreen);
