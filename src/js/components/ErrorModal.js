import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BannerCloseIcon from '../icons/BannerCloseIcon';
import { Theme } from '../constants/constants';
const { width, height } = Dimensions.get('screen');

export default ErrorModal = (props) => (
  <Modal
    visible={props.modalVisible}
    animationType="fade"
    transparent={true}
    onRequestClose={() => console.log('closed')}
  >
    <View style={styles.modalContainer}>
      <LinearGradient
        start={{ x: 0.98, y: 0.06 }} end={{ x: 0.03, y: 1.0 }}
        locations={[0, 1]}
        colors={['#7059ED', '#DA152C']}
        style={styles.loginBanner}>
        <TouchableOpacity style={styles.crossButton} onPress={props.closeModal}>
          <BannerCloseIcon style={styles.crossIcon} color="#AC9FF4" />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          {props.modalType == "LogIn" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Ooops! :('}</Text>}
          {props.modalType == "LogIn" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Login failed. Please try again.'}</Text>}

          {props.modalType == "Register" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Oh no! :('}</Text>}
          {props.modalType == "Register" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'center', fontFamily: Theme.FONT_REGULAR }}>{'Something went wrong \n while creating an account. \n Please try again.'}</Text>}

          {props.modalType == "ForgotPassword" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Ooops! :('}</Text>}
          {props.modalType == "ForgotPassword" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Reset link not sent.'}</Text>}
        </View>
      </LinearGradient>
    </View>
  </Modal >
)


const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '2.5%',
    top: 0,
    flexDirection: 'row'
  },
  loginBanner: {
    height: height - 685,
    width: width - 30,
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20,
  },
  crossButton: {
    paddingRight: 8,
    paddingTop: 5
  },
  textContainer: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  crossIcon: {
    alignSelf: 'flex-end',
    marginRight: -12,
    marginTop: 10,
    resizeMode: 'contain'
  },
})
