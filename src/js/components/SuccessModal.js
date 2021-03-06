import React from 'react'
import { Platform, Text, View, TouchableOpacity, StyleSheet, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import BannerCloseIcon from '../icons/BannerCloseIcon';
import { Theme } from '../constants/constants';
import { addBlur } from '../actions/BlurAction'

const { width, height } = Dimensions.get('screen');

const SuccessModal = (props) => {
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
              start={{ x: 0.93, y: 0.14 }} end={{ x: 0, y: 1.0 }}
              locations={[0, 1]}
              colors={['#7059ED', '#00C2FB']}
              style={styles.loginBanner}>
              <TouchableOpacity style={styles.crossButton} onPress={props.closeModal}>
                <BannerCloseIcon style={styles.crossIcon} color="#AC9FF4" />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                {props.modalType == "LogIn" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Yeah! :)'}</Text>}
                {props.modalType == "LogIn" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Login Successful!'}</Text>}

                {props.modalType == "Register" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Welcome! :)'}</Text>}
                {props.modalType == "Register" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Account successfully created!'}</Text>}

                {props.modalType == "ForgotPassword" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Yeah! :)'}</Text>}
                {props.modalType == "ForgotPassword" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Reset code sent!'}</Text>}

                {props.modalType == "UpdateUser" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Yeah! :)'}</Text>}
                {props.modalType == "UpdateUser" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'User updated successfully!'}</Text>}

                {props.modalType == "7-dayTrial" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Welcome! :)'}</Text>}
                {props.modalType == "7-dayTrial" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'Start to meditate!'}</Text>}

                {props.modalType == "LogOut" && <Text style={{ color: '#FFFFFF', fontSize: 19, fontFamily: Theme.FONT_BOLD }}>{'Logged out'}</Text>}
                {props.modalType == "LogOut" && <Text style={{ color: '#FFFFFF', fontSize: 15, marginTop: 10, fontFamily: Theme.FONT_REGULAR }}>{'See you later.'}</Text>}
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
  loginBanner: {
    ...Platform.select({
      ios: {
        height: height - 685,
      },
      android: {
        height: height - 585
      },
    }),
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
  }
})

export default connect(null, null)(SuccessModal);
