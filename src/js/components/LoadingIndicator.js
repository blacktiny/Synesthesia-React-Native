import React from 'react'
import { StyleSheet, Image } from 'react-native'
import FastImage from 'react-native-fast-image';

const loading = require("../../assets/LogoAnimation.gif");

export default LoadingIndicator = () => (
  <Image source={loading} style={styles.loading} />
)
const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    zIndex: 2000,
    width: 100,
    height: 100,
    position: 'absolute',
    top: 100,
    left: 0
  }
});
