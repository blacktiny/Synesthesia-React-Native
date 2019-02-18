
import React, { Component } from 'react'
import { Platform, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import BottomBar from '../components/BottomBar';
import { connect } from 'react-redux'

const synesthesiaImage = require('../../assets/synesthesia.png')
const mindfulessImage = require('../../assets/mindfulness.png')
const awarenessImage = require('../../assets/awareness.png')
const saveProgressImage = require('../../assets/saveProgressImage.png')
import { Theme } from '../constants/constants'
import { logoutUser } from '../actions/LoginAction'
import { cleanSynesthesia } from '../actions/SynesthesiaAction'
import { cleanMindFulness } from '../actions/MindFulnessAction'
import { cleanAwareness } from '../actions/BeingAwareAction'
import CustomButton from '../components/CustomButton';

class Sensorium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mindBtnPressStatus: false,
      awareBtnPressStatus: false,
      synesBtnPressStatus: false
    }
  }

  openSensoriumById = (id) => {
    console.log("enter synesthesia")
  }

  componentDidUpdate() {
    const { navigation } = this.props;

    // if (getSynesthesiaSuccess) navigation.navigate('Synesthesia');
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
        <BottomBar navigation={this.props.navigation} />
        <ScrollView>
          <TouchableHighlight onPress={() => {
            // this.props.cleanMindFulness();
            this.props.navigation.push('MindFulness')
          }}
            onHideUnderlay={() => this.onHideUnderlay('mindfulness')}
            onShowUnderlay={() => this.onShowUnderlay('mindfulness')}
            underlayColor={'#1F1F20'}>
            <View style={{ marginTop: -10 }}>
              <ImageBackground
                style={{
                  width: '100%',
                  height: 235,
                  display: "flex",
                  alignItems: "center",
                  opacity: mindBtnPressStatus ? 0.5 : 1.0
                }}
                resizeMode='contain'
                source={mindfulessImage}
              >
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    fontFamily: Theme.FONT_BOLD
                  }}>{'Practice Mindfulness'}</Text>
                </View>
              </ImageBackground>
              <View style={{ paddingLeft: 15, marginTop: -60 }}>
                <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: Theme.FONT_REGULAR }}>{'Path of Mindfulness'}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {
            this.props.navigation.push('BeingAware')
            // this.props.cleanAwareness();
          }}
            onHideUnderlay={() => this.onHideUnderlay('awareness')}
            onShowUnderlay={() => this.onShowUnderlay('awareness')}
            underlayColor={'#1F1F20'}>
            <View style={{ marginTop: -10 }}>
              <ImageBackground
                style={{
                  width: '100%',
                  height: 235,
                  display: "flex",
                  alignItems: "center",
                  opacity: awareBtnPressStatus ? 0.5 : 1.0
                }}
                resizeMode='contain'
                source={awarenessImage}
              >
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    textAlign: 'center',
                    fontFamily: Theme.FONT_BOLD
                  }}>{'Integrate Awareness \n into life'}</Text>
                </View>
              </ImageBackground>
              <View style={{ paddingLeft: 15, marginTop: -60 }}>
                <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: Theme.FONT_REGULAR }}>{'Life with Awareness'}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {
            this.props.navigation.push('Synesthesia')
            // this.props.cleanSynesthesia();
          }}
            onHideUnderlay={() => this.onHideUnderlay('synesthesia')}
            onShowUnderlay={() => this.onShowUnderlay('synesthesia')}
            underlayColor={'#1F1F20'}>
            <View>
              <ImageBackground
                style={{
                  width: '100%',
                  height: 235,
                  display: "flex",
                  alignItems: "center",
                  opacity: synesBtnPressStatus ? 0.5 : 1.0
                }}
                resizeMode='contain'
                source={synesthesiaImage}
              >
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    fontFamily: Theme.FONT_BOLD
                  }}>{'Discover Synesthesia'}</Text>
                </View>
              </ImageBackground>
              <View style={{ paddingLeft: 15, marginTop: -60 }}>
                <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: Theme.FONT_REGULAR }}>{'Garden of Synesthesia'}</Text>
              </View>
            </View>
          </TouchableHighlight>
          {!isLoggedIn &&
            <View style={{ marginTop: 15 }}>
              <ImageBackground
                style={{
                  width: '100%',
                  ...Platform.select({
                    ios: {
                      height: 250
                    },
                    android: {
                      height: 273
                    },
                  }),
                  display: "flex",
                  alignItems: "center",
                }}
                resizeMode='contain'
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
                    title="Create Free Account"
                    onPress={() => this.props.navigation.navigate('Register')}
                  />
                </View>
              </ImageBackground>
            </View>}
        </ScrollView>

      </View>
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
    width: 220,
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

const mapDispatchToProps = {
  logoutUser,
  cleanMindFulness,
  cleanSynesthesia,
  cleanAwareness
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sensorium)
