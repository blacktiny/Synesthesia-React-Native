import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import FastImage from 'react-native-fast-image';

const loading = require("../../assets/LogoAnimation.gif");

export default LoadingIndicator = (props) => (
  <View style={[styles.container, { position: props.soundSettings ? 'relative' : 'absolute', }]}>
    <FastImage source={loading} style={styles.loading} />
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
    left: 0,
  },
  loading: {
    justifyContent: 'center',
    zIndex: 2000,
    width: 150,
    height: 150,
  }
});
