import React, { Component } from 'react'
import { Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import PlayButton from '../components/PlayButton'
import Button from '../components/Button'
import { iPhoneX } from '../util'
import { getNodeByID } from '../actions/NodeAction'
const settings = require('../../assets/settings.png')
const background = require('../../assets/bgPlayer.png')
class Player extends Component {
  state = {
    activeTime: 10,
    timeParams: [10, 20]
  }
  componentDidMount() {
    this.props.getNodeByID()
  }
  onPressTime = (time) => {
    this.setState({ activeTime: time })
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
  render() {
    const { navigation, nodeData } = this.props
    if (this.props.isFetchingData) {
      return (
        <ImageBackground style={[styles.container, {justifyContent: 'center'}]} source={background} resizeMode="cover">
          <ActivityIndicator />
        </ImageBackground>
      )
    }
    return (
      <ImageBackground style={styles.container} source={background} resizeMode="cover">
        <View style={styles.top}>
          <Text style={styles.topTextTitle}>{nodeData.header}</Text>
          <Text style={styles.topText} numberOfLines={2}>{nodeData.subheader}</Text>
        </View>
        <View style={styles.centralBar}>
          <Text style={styles.centralText}>Need to save your Progress?</Text>
          <View style={styles.centerRow}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkText}>Create free account</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>or</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <PlayButton onPress={() => navigation.navigate('AudioPlayer')} />
          <TouchableOpacity onPress={() => navigation.navigate('AudioPlayer')}>
            <Text style={styles.bottomText}>Play anyway</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            {this.renderButtons()}
          </View>
          <Button onPress={() => console.log('To settings')}>
            <Image source={settings} style={styles.icon} resizeMode='contain' />
            <Text style={[styles.buttonText, styles.additionalMargin]}>Sound settings</Text>
          </Button>
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
  top: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginTop: iPhoneX() ? 15 : 0
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
  centralBar: {
    backgroundColor: '#343230',
    paddingVertical: 30,
    paddingHorizontal: 50,
    alignItems: 'center'
  },
  centralText: {
    fontWeight: 'bold',
    lineHeight: 23,
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  linkText: {
    fontWeight: 'bold',
    lineHeight: 19,
    fontSize: 16,
    textAlign: 'center',
    color: '#25B999'
  },
  orText: {
    fontWeight: 'normal',
    lineHeight: 19,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    paddingHorizontal: 10
  },
  bottom: {
    marginTop: iPhoneX() ? '10%' : '3%',
    alignItems: 'center',
    width: '80%'
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
    fontWeight: '600',
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
    nodeData: state.nodeReducer.nodeData,
    isFetchingData: state.nodeReducer.isFetchingData,
    exercises: state.exerciseReducer.exercises
  }
}

const mapDispatchToProps = {
  getNodeByID
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
