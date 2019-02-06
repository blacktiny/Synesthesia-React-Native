/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './src/js/store';

import LoginScreen from "./src/js/screens/LoginScreen";
import RegisterScreen from "./src/js/screens/RegisterScreen";
import ForgotPasswordScreen from "./src/js/screens/ForgotPasswordScreen";
import DisclaimerScreen from "./src/js/screens/DisclaimerScreen";
import UserScreen from "./src/js/screens/UserScreen";
import PricingScreen from "./src/js/screens/PricingScreen";
import SideMenu from './src/js/components/SideMenu';
import SensoriumScreen from './src/js/screens/SensoriumScreen';
import SynesthesiaScreen from './src/js/screens/SynesthesiaScreen';
import MindFulnessScreen from './src/js/screens/MindFulnessScreen';
import BeingAwareScreen from './src/js/screens/BeingAwareScreen';
import MeditateHeader from './src/js/components/MeditateHeader';
import SynesthesiaItemScreen from './src/js/screens/SynesthesiaItemScreen';
import PlayerScreen from './src/js/screens/PlayerScreen';
import AudioPlayerScreen from './src/js/screens/AudioPlayerScreen';
import PlayerHeader from './src/js/components/PlayerHeader';

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

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LoginScreen {...this.props} />
      </View>
    )
  }
}

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
      headerRight: <PlayerHeader navigation={navigation} />
    }),
  },
  AudioPlayer: {
    screen: AudioPlayerScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: null,
      headerRight: <PlayerHeader audioPlayer navigation={navigation} />
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

const SensoriumDrawerNavigator = createDrawerNavigator({
  Sensorium: { screen: SensoriumStackNavigator },
  Pricing: { screen: PricingStackNavigator }
}, {
    initialRouteName: 'Sensorium',
    contentComponent: (props) => <SideMenu {...props} />,
    drawerWidth: 300
  });

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Sensorium: { screen: SensoriumDrawerNavigator },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  User: { screen: UserScreen },
  Pricing: { screen: PricingScreen },
  ForgotPassword: { screen: ForgotPasswordScreen },
  Disclaimer: { screen: DisclaimerScreen }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    )
  }
}
const AppContainer = createAppContainer(AppSwitchNavigator);
export default App;
