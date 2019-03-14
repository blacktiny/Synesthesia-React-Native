/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';
import { findNodeHandle, View } from 'react-native';
import BlurBackground from './src/js/components/BlurBackground';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './src/js/store';
import { iPhone5 } from './src/js/util'
import DisclaimerScreen from "./src/js/screens/DisclaimerScreen";
import UserScreen from "./src/js/screens/UserScreen";
import PricingScreen from "./src/js/screens/PricingScreen";
import SideMenu from './src/js/components/SideMenu';
import SensoriumScreen from './src/js/screens/SensoriumScreen';
import ProgressScreen from './src/js/screens/ProgressScreen';
import SynesthesiaScreen from './src/js/screens/SynesthesiaScreen';
import MindFulnessScreen from './src/js/screens/MindFulnessScreen';
import BeingAwareScreen from './src/js/screens/BeingAwareScreen';
import MeditateHeader from './src/js/components/MeditateHeader';
import SynesthesiaItemScreen from './src/js/screens/SynesthesiaItemScreen';
import PlayerScreen from './src/js/screens/PlayerScreen';
import AudioPlayerScreen from './src/js/screens/AudioPlayerScreen';
import PlayerHeader from './src/js/components/PlayerHeader';
import ConfirmUnsubscribeScreen from './src/js/screens/ConfirmUnsubscribeScreen';
import ConfirmMonthlySubscribeScreen from './src/js/screens/ConfirmMonthlySubscribeScreen';
import ModalContainer from './src/js/components/ModalContainer'
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

// code for monitoring network requests in network tab of google chrome inspector
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};



const SensoriumStackNavigator = createStackNavigator({
  Sensorium: {
    screen: SensoriumScreen,
  },
  Synesthesia: {
    screen: SynesthesiaScreen,
  },
  SynesthesiaItem: {
    screen: SynesthesiaItemScreen,
  },
  MindFulness: {
    screen: MindFulnessScreen,
  },
  BeingAware: {
    screen: BeingAwareScreen,
  },
  Player: {
    screen: PlayerScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: null,
      headerRight: <PlayerHeader navigation={navigation} noBanner />,
      headerTransparent: true,
      headerStyle: { height: iPhone5() ? 20 : 40, borderBottomWidth: 1, borderBottomColor: 'transparent' },
    }),
  },
  AudioPlayer: {
    screen: AudioPlayerScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: null,
      headerRight: <PlayerHeader audioPlayer navigation={navigation} />,
      headerTransparent: true,
      headerStyle: { height: iPhone5() ? 20 : 40, borderBottomWidth: 1, borderBottomColor: 'transparent' },
    }),
  }
},
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: { backgroundColor: '#1F1F20', height: iPhone5() ? 30 : 60, borderBottomWidth: 1, borderBottomColor: 'transparent' },
        headerLeft: <MeditateHeader navigation={navigation} />
      }
    }
  });

const UserStackNavigator = createStackNavigator({
  User: {
    screen: UserScreen
  },
  ConfirmUnsubscribe: {
    screen: ConfirmUnsubscribeScreen
  },
  ConfirmMonthlySubscribe: {
    screen: ConfirmMonthlySubscribeScreen
  }
}, {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: { backgroundColor: '#1F1F20', height: 60, borderBottomWidth: 1, borderBottomColor: 'transparent' },
        headerLeft: <MeditateHeader navigation={navigation} />
      }
    }
  });

const PricingStackNavigator = createStackNavigator({
  Pricing: {
    screen: PricingScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: { backgroundColor: '#1F1F20', height: 60, borderBottomWidth: 1, borderBottomColor: 'transparent' },
        headerLeft: <MeditateHeader navigation={navigation} />
      }
    }
  },
}, {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: <Icon
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.openDrawer()}
          name="md-menu"
          size={30} />
      }
    }
  });

const ProgressStackNavigator = createStackNavigator({
  Progress: {
    screen: ProgressScreen,
  }
}, {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: { backgroundColor: '#1F1F20', height: 60, borderBottomWidth: 1, borderBottomColor: 'transparent' },
        headerLeft: <MeditateHeader navigation={navigation} />
      }
    }
  });

const SensoriumDrawerNavigator = createDrawerNavigator({
  Sensorium: { screen: SensoriumStackNavigator },
  User: { screen: UserStackNavigator },
  Pricing: { screen: PricingStackNavigator },
  Progress: { screen: ProgressStackNavigator }
}, {
    initialRouteName: 'Sensorium',
    contentComponent: (props) => <SideMenu {...props} />,
    drawerWidth: 300
  });

const AppSwitchNavigator = createSwitchNavigator({
  Sensorium: { screen: SensoriumDrawerNavigator },
  Progress: { screen: ProgressStackNavigator },
  Pricing: { screen: PricingScreen },
  Disclaimer: { screen: DisclaimerScreen }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewRef: null
    }
  }

  onViewLoaded() {
    this.setState({ viewRef: findNodeHandle(this.viewRef) });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View
            style={{ height: '100%', width: '100%', flex: 1 }}
            ref={(viewRef) => { this.viewRef = viewRef; }}
            onLayout={() => { this.onViewLoaded(); }} >
            <AppContainer />
          </View>
          <ModalContainer />
          <BlurBackground viewRef={this.state.viewRef} {...this.props} />
        </PersistGate>
      </Provider>
    )
  }
}
const AppContainer = createAppContainer(AppSwitchNavigator);
export default App;
