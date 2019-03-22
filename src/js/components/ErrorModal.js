import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import BannerCloseIcon from '../icons/BannerCloseIcon';
import { Theme } from '../constants/constants';
import { addBlur } from '../actions/BlurAction'

const { width, height } = Dimensions.get('screen');

const ErrorModal = (props) => {
  if (props.modalVisible) {
    props.dispatch(addBlur())
  }
  return (
    <Modal
      visible={props.modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => console.log('closed')}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPressOut={props.closeModal}
      >
        <View>
          <TouchableWithoutFeedback>
            <LinearGradient
              start={{ x: 0.98, y: 0.06 }} end={{ x: 0.03, y: 1.0 }}
              locations={[0, 1]}
              colors={['#7059ED', '#DA152C']}
              style={[styles.banner, { height: props.modalType == "Register" ? height - 650 : height - 685 }]}>
              <TouchableOpacity style={styles.crossButton} onPress={props.closeModal}>
                <BannerCloseIcon style={styles.crossIcon} color="#AC9FF4" />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                {props.modalType == "LogIn" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Ooops! :('}</Text>}
                {props.modalType == "LogIn" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Login failed. Please try again.'}</Text>}

                {props.modalType == "LogOut" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Ooops! :('}</Text>}
                {props.modalType == "LogOut" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Logged out. See you later.'}</Text>}

                {props.modalType == "Register" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Oh no! :('}</Text>}
                {props.modalType == "Register" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, textAlign: 'center', fontFamily: Theme.FONT_REGULAR }}>{'Something went wrong \n while creating an account. \n Please try again.'}</Text>}

                {props.modalType == "ForgotPassword" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Ooops! :('}</Text>}
                {props.modalType == "ForgotPassword" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Reset link not sent.'}</Text>}

                {props.modalType == "7-dayTrial" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Ooops! :('}</Text>}
                {props.modalType == "7-dayTrial" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Something went wrong with payment\n try again later'}</Text>}
              </View>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

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
  banner: {
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

export default connect(null, null)(ErrorModal);