import React from 'react'
import { StyleSheet, Image, View, Dimensions} from 'react-native'

import FastImage from 'react-native-fast-image';

const loading = require("../../assets/LogoAnimation.gif");

export default LoadingIndicator = () => (
  <View style={styles.container}>
  <Image source={loading} style={styles.loading} />
  </View>
)
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
    position: 'absolute',
    left: 0,
  },
  loading: {
    justifyContent: 'center',
    zIndex: 2000,
    width: 100,
    height: 100,
  }
});
