
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, TouchableOpacity, View, Image, StyleSheet, Dimensions, ImageBackground, FlatList, Linking } from 'react-native';
import CustomButton from '../components/CustomButton';
import { iPhoneX } from '../../js/util';
import ModalCloseIcon from '../icons/ModalCloseIcon';

import { logoutUser } from '../../js/actions/LogoutAction';
import { setMenuItem, getCurMenuItem } from '../../js/actions/SideMenuAction';

const { height, width } = Dimensions.get('screen');
const blurImage = require('../../../src/assets/blurImage.png');
const cross = require('../../../src/assets/cross.png');
const gradientLine = require('../../../src/assets/gradientLine.png');
const loginButton = require('../../../src/assets/loginButton.png');
import { Theme } from '../constants/constants'

const meanuItems = [
  { name: 'Meditate in Sensorium', route: 'Sensorium', url: '' },
  { name: 'My account', route: 'User', url: '' },
  { name: 'Pricing', route: 'Pricing', url: '' },
  { name: 'Login', route: 'Login', url: '' },
  { name: 'How it works', route: '', url: 'https://synesthesia.com/#/HowItWorks' },
  { name: 'Blog', route: '', url: 'https://synesthesia.com/blog/' },
  { name: 'Contact', route: '', url: 'https://synesthesia.com/#/ContactUs' },
  { name: 'About us', route: '', url: 'https://synesthesia.com/#/AboutUs' },
  { name: 'FAQ', route: '', url: 'https://synesthesia.com/#/faq' },
  { name: 'Privacy Policy', route: '', url: 'https://synesthesia.com/#/privacy' },
  { name: 'T&C', route: '', url: 'https://synesthesia.com/#/TermsAndConditions' },
  { name: 'Disclaimer', route: '', url: '' },
  { name: 'Rate the app', route: '', url: '' },
  { name: 'Log out', route: 'Login', url: '' }
]
class SideMenu extends Component {

  constructor() {
    super();
    this.state = {
      menuData: meanuItems
    }
  }

  componentDidMount() {
    this.props.dispatch(getCurMenuItem());
  }

  onMenuItemClicked = (routeName, itemName, url) => {
    this.props.navigation.navigate(routeName);
    if (itemName == 'Log out') {
      this.props.dispatch(logoutUser());
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
    const { isLoggedIn, user } = this.props;
    let output;
    if (isLoggedIn) {
      output = (
        <View style={styles.userInfo}>
          <Image style={{ alignSelf: 'flex-end', height: 20, width: 20, margin: 10 }} resizeMode='contain' source={cross} />
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.useremail}>{user.email}</Text>
        </View>
      );
    } else {
      output = (
        <View>
          <Image style={{ alignSelf: 'flex-end', height: 20, width: 20, margin: 10 }} resizeMode='contain' source={cross} />
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
        <ImageBackground source={blurImage} style={{ height: iPhoneX() ? height - 670 : height - 530, shadowOffset: { width: 1, height: 1, }, shadowColor: 'black', shadowOpacity: 0.75, }}>
          {output}
        </ImageBackground>
      </View>
    );
  }

  renderData = (item, index, type) => {
    const { currentItem, isLoggedIn } = this.props;
    var curItem;
    if (currentItem == 'Login' || currentItem == 'Log out') {
      curItem = 'Meditate in Sensorium';
    } else {
      curItem = currentItem;
    }
    return (
      <View>
        {item.name != 'My account' && item.name != 'Login' && item.name != 'Log out' && item.name != 'Privacy Policy' && item.name != 'T&C' && item.name != 'Disclaimer' && item.name != 'playStoreImage' && item.name != curItem && item.name != 'Meditate in Sensorium' && <Text style={styles.textStyle} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>}
        {isLoggedIn && item.name == 'My account' && curItem != 'My account' && <Text style={styles.textStyle} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>}
        {!isLoggedIn && item.name == 'Login' && <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 8, marginBottom: 10 }}>
          <Image source={loginButton} style={{ height: 20, width: 20 }} />
          <Text style={{ fontSize: 18, color: '#30CA9A', marginLeft: 10 }} onPress={() => this.onMenuItemClicked(item.route, item.name)}>{'Login'}</Text>
        </View>}
        {item.name == 'Meditate in Sensorium' && item.name == curItem && <View style={{ marginTop: 25, flexDirection: 'row', backgroundColor: '#1B1B1C' }}>
          <Image source={gradientLine} style={{ height: 45, width: 3 }} />
          <Text style={[styles.textStyle, { fontFamily: Theme.FONT_SEMIBOLD }]} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>
        </View>}
        {item.name == 'Meditate in Sensorium' && item.name != curItem && <View style={{ marginTop: 25 }}>
          <Text style={[styles.textStyle, { fontFamily: Theme.FONT_LIGHT }]} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>
        </View>}
        {item.name == curItem && item.name != 'Meditate in Sensorium' && item.name != 'Login' &&<View style={{ flexDirection: 'row', backgroundColor: '#1B1B1C' }}>
          <Image source={gradientLine} style={{ height: 45, width: 3 }} />
          <Text style={styles.textStyle} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>
        </View>}
        {isLoggedIn && item.name == 'Log out' && <View style={{ backgroundColor: '#090909', height: 1, width: 300, marginTop: 10, marginBottom: 10 }} />}
        {isLoggedIn && item.name == 'Log out' && <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 8, marginBottom: 10 }}>
          <Image source={loginButton} style={{ height: 20, width: 20 }} />
          <Text style={{ fontSize: 18, color: '#30CA9A', marginLeft: 10 }} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>
        </View>}
        {/* {item.name == curItem && item.name != 'Privacy Policy' && item.name != 'T&C' && item.name != 'Meditate in Sensorium' && item.name != 'Login' && <View style={{ flexDirection: 'row', backgroundColor: '#1B1B1C' }}>
          <Image source={gradientLine} style={{ height: 45, width: 3 }} />
          <Text style={[styles.textStyle, { fontFamily: Theme.FONT_SEMIBOLD }]} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>
        </View>} */}
        {(item.name == 'Privacy Policy' || item.name == 'T&C') && <Text style={styles.textStyle2} onPress={() => this.onMenuItemClicked(item.route, item.name, item.url)}>{item.name}</Text>}
        {item.name == 'Login' && <View style={{ backgroundColor: 'rgba(9,9,9, 0.26)', height: 1, width: 300, marginTop: 10, marginBottom: 10 }} />}
        {item.name == 'FAQ' && <View style={{ backgroundColor: 'rgba(9,9,9, 0.26)', height: 1, width: 300, marginTop: 10, marginBottom: 10 }} />}
        {item.name == 'Disclaimer' && <Text style={styles.textStyle2} onPress={() => this.openDisclaimer()}>{item.name}</Text>}
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
          renderItem={({ item, index }) => this.renderData(item, index, 'videos')}
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
  username: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 18,
    color: 'white',
    paddingTop: 10
  },
  useremail: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 14,
    color: 'white',
    paddingTop: 5,
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