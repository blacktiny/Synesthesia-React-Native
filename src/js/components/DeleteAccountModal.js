import React from 'react'
import { Text, ScrollView, View, TouchableOpacity, StyleSheet, Modal, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import BannerCloseIcon from '../icons/BannerCloseIcon';
import { Theme } from '../constants/constants';
import { addBlur } from '../actions/BlurAction'
import FastImage from 'react-native-fast-image';
const exclamationImage = require('../../assets/exclamation.png');
const { width, height } = Dimensions.get('screen');

const DeleteAccountModal = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => console.log('closed')}>
      <View style={styles.modalContainer}>
        <LinearGradient
          start={{ x: 0.17, y: 0.97 }} end={{ x: 0.67, y: 0.44 }}
          locations={[0, 1]}
          colors={['#505052', '#3D3D3E']}
          style={styles.lockedBanner}>
          <View>
            <TouchableOpacity style={styles.crossButton} onPress={props.onClose}>
              <BannerCloseIcon style={styles.crossIcon} color="#777778" />
            </TouchableOpacity>
            {props.userType > 0 ?
              <View style={{ alignItems: 'center' }}>
                <View>
                  <FastImage style={{ alignSelf: 'center', height: 78, width: 84, marginLeft: 14, marginTop: 1 }} resizeMode={FastImage.resizeMode.contain} source={exclamationImage} />
                  <Text style={{ fontSize: 18, textAlign: 'center', color: '#FFFFFF', marginTop: 20, fontFamily: Theme.FONT_BOLD }}>You have an active subscription</Text>
                  <Text style={{ fontSize: 16, textAlign: 'center', paddingLeft: 0, paddingRight: 0, color: '#FFFFFF', marginTop: 20, fontFamily: Theme.FONT_REGULAR }}>You cannot delete your account yet.{"\n"} Please unsubscribe first.</Text>
                </View>
                <TouchableOpacity style={[styles.modalButton, styles.continueButton]} onPress={props.onClose}>
                  <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: Theme.FONT_BOLD }}>Ok, got it!</Text>
                </TouchableOpacity>
              </View>
              :
              <View style={{ alignItems: 'center' }}>
                <View>
                  <FastImage style={{ alignSelf: 'center', height: 78, width: 84, marginLeft: 14, marginTop: 1 }} resizeMode={FastImage.resizeMode.contain} source={exclamationImage} />
                  <Text style={{ fontSize: 18, textAlign: 'center', color: '#FFFFFF', marginTop: 18, fontFamily: Theme.FONT_BOLD }}>You want to delete everything?</Text>
                  <Text style={{ fontSize: 16, textAlign: 'center', paddingLeft: 25, paddingRight: 25, color: '#FFFFFF', marginTop: 20, lineHeight: 22, fontFamily: Theme.FONT_REGULAR }}>If you delete your account, all your data will be lost. You will loose access forever.</Text>
                </View>
                <TouchableOpacity style={[styles.modalButton, styles.continueButton]} onPress={props.onClose}>
                  <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: Theme.FONT_BOLD }}>Keep my account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.deleteAccountButton]} onPress={props.onClose}>
                  <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: Theme.FONT_BOLD }}>Delete my account</Text>
                </TouchableOpacity>
              </View>}
          </View>
        </LinearGradient>
      </View>
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
  lockedBanner: {
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 40,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    elevation: 2,
    alignItems: 'center'
  },
  crossButton: {
    width: 20,
    height: 20,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  crossIcon: {
    resizeMode: 'contain'
  },
  modalButton: {
    width: width - 100,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButton: {
    marginTop: 30,
    backgroundColor: '#25B999',
    borderWidth: 0
  },
  deleteAccountButton: {
    backgroundColor: '#DE1F36',
    marginTop: 15,
    borderWidth: 0
  }
})


export default connect(null, null)(DeleteAccountModal);
