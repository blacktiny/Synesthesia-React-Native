
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, TouchableHighlight, View, Image, StyleSheet, Dimensions, ImageBackground, FlatList, Linking } from 'react-native';
import CustomButton from '../components/CustomButton';
import { iPhoneX } from '../../js/util';
import ModalCloseIcon from '../icons/ModalCloseIcon';

import { logoutUser } from '../../js/actions/LogoutAction';
import { setMenuItem, getCurMenuItem } from '../../js/actions/SideMenuAction';
import { cleanSynesthesia } from '../actions/SynesthesiaAction'
import { cleanMindFulness } from '../actions/MindFulnessAction'
import { cleanAwareness } from '../actions/BeingAwareAction'
import { cleanProgress } from '../actions/ProgressAction'
import { setHeaderItem } from '../actions/MeditateHeaderAction'

import { Theme } from '../constants/constants'

const { height, width } = Dimensions.get('screen');
const blurImage = require('../../../src/assets/blurImage.png');
const cross = require('../../../src/assets/cross.png');
const gradientLine = require('../../../src/assets/gradientLine.png');
const loginButton = require('../../../src/assets/loginButton.png');

const menuItems = [
  { name: 'Meditate', route: 'Sensorium', url: '' },
  { name: 'My account', route: 'User', url: '' },
  { name: '7 days for free', route: 'Pricing', url: '' },
  { name: 'Login', route: 'Login', url: '' },
  { name: 'Blog', route: '', url: 'https://synesthesia.com/blog/' },
  { name: 'Contact', route: '', url: 'https://synesthesia.com/#/ContactUs' },
  { name: 'About us', route: '', url: 'https://synesthesia.com/#/AboutUs' },
  { name: 'FAQ', route: '', url: 'https://synesthesia.com/#/faq' },
  { name: 'Privacy Policy, T&C, Disclaimer', route: '', url: 'https://synesthesia.com/#/privacy,https://synesthesia.com/#/TermsAndConditions,null' },
  { name: 'Rate the app', route: '', url: '' },
  { name: 'Log out', route: 'Login', url: '' }
]
class SideMenu extends Component {

  constructor() {
    super();
    this.state = {
      menuData: menuItems,
      loginBtnPressStatus: false,
      logoutBtnPressStatus: false,
      closeBtnPressStatus: false
    }
  }

  componentDidMount() {
    this.props.dispatch(getCurMenuItem());
  }

  onMenuItemClicked = (routeName, itemName, url) => {
    this.props.navigation.navigate(routeName);
    if (itemName == 'Log out') {
      this.props.dispatch(cleanSynesthesia());
      this.props.dispatch(cleanMindFulness());
      this.props.dispatch(cleanAwareness());
      this.props.dispatch(cleanProgress());
      this.props.dispatch(setHeaderItem('Sensorium'));
      this.props.dispatch(logoutUser());
    }
    if (itemName == 'Meditate') {
      this.props.dispatch(setHeaderItem('Sensorium'));
    }
    if (itemName == '7 days for free' || itemName == 'My account' || itemName == 'Login') {
      this.props.dispatch(setHeaderItem(''));
    }
    this.props.dispatch(setMenuItem(itemName));
    if (url) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  }

  openDisclaimer = () => {
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate('Disclaimer');
  }

  renderHeader = () => {
    const { isLoggedIn, user, navigation } = this.props;
    const { closeBtnPressStatus } = this.state;
    let output;
    if (isLoggedIn) {
      output = (
        <View style={styles.userInfo}>
          <TouchableHighlight
            onPress={() => {
              navigation.closeDrawer();
            }}
            onHideUnderlay={() => this.onHideUnderlay('closeDrawer')}
            onShowUnderlay={() => this.onShowUnderlay('closeDrawer')}
            underlayColor={'transparent'}
          >
            <Image
              style={{
                alignSelf: 'flex-end',
                height: 20,
                width: 20,
                margin: 10,
                opacity: closeBtnPressStatus ? 0.5 : 1.0
              }}
              resizeMode='contain'
              source={cross}
            />
          </TouchableHighlight>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      );
    } else {
      output = (
        <View>
          <TouchableHighlight
            onPress={() => {
              navigation.closeDrawer();
            }}
            onHideUnderlay={() => this.onHideUnderlay('closeDrawer')}
            onShowUnderlay={() => this.onShowUnderlay('closeDrawer')}
            underlayColor={'transparent'}
          >
            <Image
              style={{
                alignSelf: 'flex-end',
                height: 20,
                width: 20,
                margin: 10,
                opacity: closeBtnPressStatus ? 0.5 : 1.0
              }}
              resizeMode='contain'
              source={cross}
            />
          </TouchableHighlight>
          <CustomButton
            disabled={false}
            style={styles.button}
            title="Create Free Account"
            onPress={() => this.props.navigation.navigate('Register')}
          />
        </View>
      );
    }
    return (
      <View style={styles.blur}>
        <ImageBackground source={blurImage} style={{ height: 135, shadowOffset: { width: 1, height: 1, }, shadowColor: 'black', shadowOpacity: 0.75, }}>
          {output}
        </ImageBackground>
      </View>
    );
  }

  onHideUnderlay(itemName) {
    if (itemName == 'Login') {
      this.setState({ loginBtnPressStatus: false });
    } else if (itemName == 'Log out') {
      this.setState({ logoutBtnPressStatus: false });
    } else if (itemName == 'closeDrawer') {
      this.setState({ closeBtnPressStatus: false });
    }
  }

  onShowUnderlay(itemName) {
    if (itemName == 'Login') {
      this.setState({ loginBtnPressStatus: true });
    } else if (itemName == 'Log out') {
      this.setState({ logoutBtnPressStatus: true });
    } else if (itemName == 'closeDrawer') {
      this.setState({ closeBtnPressStatus: true });
    }
  }

  renderData = (item, index) => {
    const { loginBtnPressStatus, logoutBtnPressStatus } = this.state;
    const { currentItem, isLoggedIn } = this.props;
    var curItem;
    if (currentItem == 'Login' || currentItem == 'Log out') {
      curItem = 'Meditate';
    } else {
      curItem = currentItem;
    }
    return (
      <View>
        {item.name != 'Blog' && item.name != 'My account' && item.name != 'Contact' && item.name != 'About us' && item.name != 'FAQ' && item.name != 'Privacy Policy, T&C, Disclaimer' && item.name != 'Meditate' && item.name != 'Login' && item.name != 'Log out' && item.name != curItem && <Text style={styles.textStyle} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>}
        {item.name != 'My account' && item.name != 'Login' && item.name != 'Log out' && item.name != 'Privacy Policy, T&C, Disclaimer' && item.name != curItem && item.name != 'Meditate' && item.name != 'Rate the app' && item.name != '7 days for free' && <Text style={[styles.textStyle, { fontFamily: Theme.FONT_LIGHT }]} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>}


        {isLoggedIn && item.name == 'My account' && curItem != 'My account' && <Text style={styles.textStyle} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>}
        {!isLoggedIn && item.name == 'Login' && <TouchableHighlight style={{ flexDirection: 'row', marginLeft: 15, marginTop: 8, marginBottom: 10 }} onPress={() => this.onMenuItemClicked(item.route, item.name)} onHideUnderlay={() => this.onHideUnderlay(item.name)} onShowUnderlay={() => this.onShowUnderlay(item.name)} underlayColor={'#1F1F20'}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Image source={loginButton} style={{ height: 20, width: 20, opacity: loginBtnPressStatus ? 0.7 : 1.0 }} />
            <Text style={{ fontSize: 18, color: '#30CA9A', marginLeft: 10, opacity: loginBtnPressStatus ? 0.7 : 1.0 }}>{'Login'}</Text>
          </View>
        </TouchableHighlight>}
        {item.name == 'Meditate' && item.name == curItem && <View style={{ marginTop: 25, flexDirection: 'row', backgroundColor: '#1B1B1C' }}>
          <Image source={gradientLine} style={{ height: 45, width: 3 }} />
          <Text style={[styles.textStyle, { fontFamily: Theme.FONT_SEMIBOLD }]} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>
        </View>}
        {item.name == 'Meditate' && item.name != curItem && <View style={{ marginTop: 25 }}>
          <Text style={[styles.textStyle, { fontFamily: Theme.FONT_SEMIBOLD }]} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>
        </View>}
        {item.name == curItem && item.name != 'Meditate' && item.name != 'Login' && item.name != 'Privacy Policy, T&C, Disclaimer' && <View style={{ flexDirection: 'row', backgroundColor: '#1B1B1C' }}>
          <Image source={gradientLine} style={{ height: 45, width: 3 }} />
          <Text style={styles.textStyle} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>
        </View>}
        {isLoggedIn && item.name == 'Log out' && <View style={{ backgroundColor: 'rgba(9,9,9, 0.26)', height: 1, width: 300, marginTop: 10, marginBottom: 10 }} />}
        {isLoggedIn && item.name == 'Log out' && <TouchableHighlight style={{ flexDirection: 'row', marginLeft: 15, marginTop: 8, marginBottom: 10 }} onPress={() => this.onMenuItemClicked(item.route, item.name)} onHideUnderlay={() => this.onHideUnderlay(item.name)} onShowUnderlay={() => this.onShowUnderlay(item.name)} underlayColor={'#1F1F20'}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Image source={loginButton} style={{ height: 20, width: 20, opacity: loginBtnPressStatus ? 0.7 : 1.0 }} />
            <Text style={{ fontSize: 18, color: '#30CA9A', marginLeft: 10, opacity: loginBtnPressStatus ? 0.7 : 1.0 }}>{'Log out'}</Text>
          </View>
        </TouchableHighlight>}
        {item.name == 'Privacy Policy, T&C, Disclaimer' &&
          <Text style={styles.textStyle2}>
            <Text style={styles.textStyle2} onPress={() => this.onMenuItemClicked(item.route, item.name.split(',')[0].trim(), item.url.split(',')[0].trim())}>{'Privacy Policy, '}</Text>
            <Text style={styles.textStyle2} onPress={() => this.onMenuItemClicked(item.route, item.name.split(',')[1].trim(), item.url.split(',')[1].trim())}>{'T&C, '}</Text>
            <Text style={styles.textStyle2} onPress={() => this.openDisclaimer()}>{'Disclaimer'}</Text>
          </Text>
        }
        {item.name == 'Login' && <View style={{ backgroundColor: 'rgba(9,9,9, 0.26)', height: 1, width: 300, marginTop: 10, marginBottom: 10 }} />}
        {item.name == 'FAQ' && <View style={{ backgroundColor: 'rgba(9,9,9, 0.26)', height: 1, width: 300, marginTop: 10, marginBottom: 10 }} />}
        {/* {item.name == 'Disclaimer' && <Text style={styles.textStyle2} onPress={() => this.openDisclaimer()}>{item.name}</Text>} */}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <FlatList
          data={this.state.menuData}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, flexDirection: 'column' }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => this.renderData(item, index)}
          extraData={this.state.menuData}
        />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F20',
  },
  textStyle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10
  },
  blur: {
    marginTop: iPhoneX() ? 30 : 0,
  },
  textStyle2: {
    fontSize: 16,
    color: '#777778',
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: Theme.FONT_LIGHT
  },
  userInfo: {
    paddingLeft: 30
  },
  userEmail: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 17,
    color: 'white',
    paddingTop: 25
  },
  button: {
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 250,
    borderRadius: 45,
    backgroundColor: '#25B999'
  }
});

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    user: state.loginReducer.user,
    currentItem: state.sidemenuReducer.currentItem
  }
}

export default connect(mapStateToProps)(SideMenu);