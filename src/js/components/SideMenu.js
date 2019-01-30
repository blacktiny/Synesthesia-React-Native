
import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ImageBackground, FlatList } from 'react-native';
import CustomButton from '../components/CustomButton';
import { iPhoneX } from '../../js/util';
const { height, width } = Dimensions.get('screen');
const blurImage = require('../../../src/assets/blurImage.png');
const cross = require('../../../src/assets/cross.png');
const gradientLine = require('../../../src/assets/gradientLine.png');
const loginButton = require('../../../src/assets/loginButton.png');
const playStore = require('../../../src/assets/playStore.png');

const meanuItems = [
  { name: 'Meditate in Sensorium' },
  { name: 'Pricing' },
  { name: 'Login' },
  { name: 'How it works' },
  { name: 'Blog' },
  { name: 'Contact' },
  { name: 'About us' },
  { name: 'FAQ' },
  { name: 'Privacy Policy' },
  { name: 'T&C' },
  { name: 'Disclaimer' },
  { name: 'playStoreImage', image: playStore }
]
class SideMenu extends Component {

  constructor() {
    super();
    this.state = {
      menuData: meanuItems
    }
  }

  renderData = (item, index, type) => {
    return (
      <View>
        {item.name != 'Login' && item.name != 'Privacy Policy' && item.name != 'T&C' && item.name != 'Disclaimer' && item.name != 'playStoreImage' && item.name != 'Meditate in Sensorium' && <Text style={styles.textStyle}>{item.name}</Text>}
        {item.name == 'Login' && <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 8, marginBottom: 10 }}>
          <Image source={loginButton} style={{ height: 20, width: 20 }} />
          <Text style={{ fontSize: 18, color: '#30CA9A', marginLeft: 10 }}>{'Login'}</Text>
        </View>}
        {item.name == 'Meditate in Sensorium' && <View style={{ marginTop: 25, flexDirection: 'row', backgroundColor: '#1B1B1C' }}>
          <Image source={gradientLine} style={{ height: 45, width: 3 }} />
          <Text style={styles.textStyle}>{'Meditate in Sensorium'}</Text>
        </View>}
        {(item.name == 'Privacy Policy' || item.name == 'T&C' || item.name == 'Disclaimer') && <Text style={styles.textStyle2}>{item.name}</Text>}
        {item.name == 'Login' && <View style={{ backgroundColor: '#090909', height: 1, width: 300, marginTop: 10, marginBottom: 10 }} />}
        {item.name == 'FAQ' && <View style={{ backgroundColor: '#090909', height: 1, width: 300, marginTop: 10, marginBottom: 10 }} />}
        {item.name == 'playStoreImage' && <Image source={item.image} style={{ height: 50, width: 140, marginLeft: 15, marginBottom: 10, marginTop: 10 }} />}
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.blur}>
          <ImageBackground source={blurImage} style={{ height: iPhoneX() ? height - 670 : height - 530, shadowOffset: { width: 1, height: 1, }, shadowColor: 'black', shadowOpacity: 0.75, }}>
            <Image style={{ alignSelf: 'flex-end', height: 20, width: 20, margin: 10 }} resizeMode='contain' source={cross} />
            <CustomButton
              disabled={false}
              style={styles.button}
              title="Create Free Account"
              onPress={() => this.handleOnSubmit()}
            />
          </ImageBackground>
        </View>
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
    backgroundColor: '#1F1F1F',
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
    marginBottom: 10
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

export default SideMenu;