
import React, { Component } from 'react'
import { Platform, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import BottomBar from '../components/BottomBar';
import { connect } from 'react-redux'

const synesthesiaImage = require('../../assets/synesthesia.png')
const mindfulessImage = require('../../assets/mindfulness.png')
const awarenessImage = require('../../assets/awareness.png')
const saveProgressImage = require('../../assets/saveProgressImage.png')
import { Theme } from '../constants/constants'
import CustomButton from '../components/CustomButton';
import { openRegisterModal } from '../actions/ToggleFormModalAction'
import FastImage from 'react-native-fast-image';
import { addBlur, removeBlur } from '../actions/BlurAction'
import { setBottomBarItem } from '../actions/BottomBarAction'
import { NavigationEvents } from 'react-navigation';

class Sensorium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mindBtnPressStatus: false,
      awareBtnPressStatus: false,
      synesBtnPressStatus: false
    }
  }

  componentDidMount() {
    this.props.dispatch(removeBlur());
  }

  onHideUnderlay = (itemName) => {
    if (itemName == 'mindfulness') {
      this.setState({ mindBtnPressStatus: false });
    } else if (itemName == 'awareness') {
      this.setState({ awareBtnPressStatus: false });
    } else if (itemName == 'synesthesia') {
      this.setState({ synesBtnPressStatus: false });
    }
  }

  onShowUnderlay = (itemName) => {
    if (itemName == 'mindfulness') {
      this.setState({ mindBtnPressStatus: true });
    } else if (itemName == 'awareness') {
      this.setState({ awareBtnPressStatus: true });
    } else if (itemName == 'synesthesia') {
      this.setState({ synesBtnPressStatus: true });
    }
  }

  render() {
    const { mindBtnPressStatus, awareBtnPressStatus, synesBtnPressStatus } = this.state;
    const { isLoggedIn, user } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20', paddingBottom: 70 }}>
        <NavigationEvents onDidFocus={() => this.props.dispatch(setBottomBarItem(''))} />
        <BottomBar navigation={this.props.navigation} />
        <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>

          <Text style={{ fontSize: 22, textAlign: 'center', color: '#fff', fontFamily: Theme.FONT_BOLD, marginTop: 15 }}>{'Meditate in the Sensorium'}</Text>
          <Text style={{ fontSize: 18, textAlign: 'center', color: '#fff', fontFamily: Theme.FONT_REGULAR, marginTop: 10, marginBottom: 18 }}>{'What would you like to do?'}</Text>

          <TouchableHighlight onPress={() => {
            this.props.navigation.navigate('MindFulness')
            this.props.dispatch(setBottomBarItem('MindFulness'))
          }}
            onHideUnderlay={() => this.onHideUnderlay('mindfulness')}
            onShowUnderlay={() => this.onShowUnderlay('mindfulness')}
            underlayColor={'#1F1F20'}>
            <View style={{ height: 190 }}>
              <ImageBackground
                style={{
                  width: '100%',
                  height: '100%',
                  display: "flex",
                  alignItems: "center",
                  opacity: mindBtnPressStatus ? 0.5 : 1.0
                }}
                resizeMode='cover'
                source={mindfulessImage}
              >
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    fontFamily: Theme.FONT_BOLD
                  }}>{'Practice Mindfulness'}</Text>
                  <Text style={{
                    fontSize: 16,
                    marginTop: 10,
                    color: '#FFFFFF',
                    fontFamily: Theme.FONT_REGULAR
                  }}>{'For less stress & more balance'}</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {
            this.props.navigation.navigate('BeingAware')
            this.props.dispatch(setBottomBarItem('BeingAware'))
          }}
            onHideUnderlay={() => this.onHideUnderlay('awareness')}
            onShowUnderlay={() => this.onShowUnderlay('awareness')}
            underlayColor={'#1F1F20'}>
            <View style={{ height: 190, marginTop: -32 }}>
              <FastImage
                style={{
                  width: '100%',
                  height: '100%',
                  display: "flex",
                  alignItems: "center",
                  opacity: awareBtnPressStatus ? 0.5 : 1.0
                }}
                resizeMode={FastImage.resizeMode.cover}
                source={awarenessImage}
              >
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    textAlign: 'center',
                    fontFamily: Theme.FONT_BOLD
                  }}>{'Awareness of your Senses'}</Text>
                  <Text style={{
                    fontSize: 16,
                    marginTop: 10,
                    color: '#FFFFFF',
                    fontFamily: Theme.FONT_REGULAR
                  }}>{'Mindful presence in your surrounding'}</Text>
                </View>
              </FastImage>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {
            this.props.navigation.navigate('Synesthesia')
            this.props.dispatch(setBottomBarItem('Synesthesia'))
          }}
            onHideUnderlay={() => this.onHideUnderlay('synesthesia')}
            onShowUnderlay={() => this.onShowUnderlay('synesthesia')}
            underlayColor={'#1F1F20'}>
            <View style={{ height: 190, marginTop: -32 }}>
              <FastImage
                style={{
                  width: '100%',
                  height: '100%',
                  display: "flex",
                  alignItems: "center",
                  opacity: synesBtnPressStatus ? 0.5 : 1.0
                }}
                resizeMode={FastImage.resizeMode.cover}
                source={synesthesiaImage}
              >
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    fontFamily: Theme.FONT_BOLD
                  }}>{'Discover Synesthesia'}</Text>
                  <Text style={{
                    fontSize: 16,
                    marginTop: 10,
                    color: '#FFFFFF',
                    fontFamily: Theme.FONT_REGULAR
                  }}>{'Blend your senses'}</Text>
                </View>
              </FastImage>
            </View>
          </TouchableHighlight>
          {
            !isLoggedIn &&
            <View style={{ marginTop: -32 }}>
              <FastImage
                style={{
                  width: '100%',
                  height: 248,
                  display: "flex",
                  alignItems: "center",
                }}
                resizeMode={FastImage.resizeMode.cover}
                source={saveProgressImage}
              >
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    textAlign: 'center',
                    position: 'absolute',
                    top: 50,
                    fontFamily: Theme.FONT_BOLD
                  }}>{'Do you want to save your \n progress?'}</Text>

                  <CustomButton
                    disabled={false}
                    style={styles.button}
                    title="Create a free account"
                    onPress={() => { this.props.dispatch(addBlur()); this.props.dispatch(openRegisterModal()) }}
                  />
                </View>
              </FastImage>
            </View>
          }
        </ScrollView >

      </View >
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
    width: 230,
    borderRadius: 45,
    backgroundColor: '#25B999',
    opacity: 1
  }
});

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    user: state.loginReducer.user,
    currentItem: state.sidemenuReducer.currentItem
  }
}

export default connect(mapStateToProps)(Sensorium)
