import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView, TouchableHighlight, Image, ActivityIndicator } from 'react-native'
import LinearGradient from "react-native-linear-gradient";

import { Theme } from '../constants/constants';
import PersonalSettings from './MyAccount/PersonalSettings';
import Subscription from './MyAccount/Subscription';

const { width, height } = Dimensions.get('screen');

export default class UserScreen extends Component {
  constructor() {
    super();
    this.state = {
      toggleType: true,
      isToggleBtnShow: true,
      isConfirmUnsubscribeShowed: false,
    }
  }

  onToggleBtnClicked = (bToggle) => {
    const { toggleType } = this.state;
    if (toggleType != bToggle) {
      this.setState({ toggleType: bToggle });
    }
  }

  onHideAndShowToggleBtn = (isShow) => {
    this.setState({ isToggleBtnShow: isShow });
  }

  onUnsubscribeClicked = () => {
    this.props.navigation.navigate('ConfirmUnsubscribe');
  }

  onSubscribeClicked = (subscribeType) => {
    if (subscribeType === 1)
      this.props.navigation.navigate('ConfirmMonthlySubscribe');
  }

  render() {
    const { toggleType, isToggleBtnShow } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.main}>
        <ScrollView style={styles.formContainer}>
          {isToggleBtnShow && <View style={{ height: 50, marginBottom: 10, width: '100%', flexDirection: 'row' }}>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={toggleType ? ["#6F58ED", "#AEA2F2"] : ["#ffffff", "#ffffff"]}
              style={[styles.toggleBtnBack, { borderTopLeftRadius: 27.5, borderBottomLeftRadius: 27.5 }]}
            >
              <TouchableHighlight style={[styles.toggleButton, { width: toggleType ? (width - 30) / 2 - 4 : (width - 30) / 2, borderTopLeftRadius: 27.5, borderBottomLeftRadius: 27.5, marginRight: toggleType ? 2 : 0 }]} onPress={() => this.onToggleBtnClicked(true)} underlayColor={"#2e2e2f"}>
                <Text style={{ fontFamily: Theme.FONT_SEMIBOLD, fontSize: 15, color: 'white' }}>Personal Settings</Text>
              </TouchableHighlight>
            </LinearGradient>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={toggleType ? ["#ffffff", "#ffffff"] : ["#AEA2F2", "#6F58ED"]}
              style={[styles.toggleBtnBack, { borderTopRightRadius: 27.5, borderBottomRightRadius: 27.5 }]}
            >
              <TouchableHighlight style={[styles.toggleButton, { width: toggleType ? (width - 30) / 2 : (width - 30) / 2 - 4, borderTopRightRadius: 27.5, borderBottomRightRadius: 27.5, marginLeft: toggleType ? 0 : 2 }]} onPress={() => this.onToggleBtnClicked(false)} underlayColor={"#2e2e2f"}>
                <Text style={{ fontFamily: Theme.FONT_SEMIBOLD, fontSize: 15, color: 'white' }}>Subscription</Text>
              </TouchableHighlight>
            </LinearGradient>
          </View>}
          {toggleType && <PersonalSettings onHideAndShowToggleBtn={(isShow) => this.onHideAndShowToggleBtn(isShow)} />}
          {!toggleType &&
            <Subscription
              onUnsubscribeClicked={() => this.onUnsubscribeClicked()}
              onSubscribeClicked={(subscribeType) => this.onSubscribeClicked(subscribeType)}
              navigation={navigation}
            />}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1F1F20'
  },
  formContainer: {
    padding: 15
  },
  toggleBtnBack: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggleButton: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F20',
    margin: 2
  }
})

