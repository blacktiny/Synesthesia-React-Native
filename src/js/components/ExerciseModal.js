import React from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BannerCloseIcon from '../icons/BannerCloseIcon';
const banneractivitylockedImage = require('../../assets/lock3.png');
const bannerpaymentlockedImage = require('../../assets/lock4.png');
import { Theme } from '../constants/constants';
const { width, height } = Dimensions.get('screen');

export default ExerciseModal = (props) => (
  <Modal visible={props.modalVisible} animationType="slide" transparent={true}
    onRequestClose={() => console.log('closed')}>
    <View style={styles.modalContainer}>
      <LinearGradient
        start={{ x: 0.17, y: 0.97 }} end={{ x: 0.67, y: 0.44 }}
        locations={[0, 1]}
        colors={['#505052', '#3D3D3E']}
        style={styles.lockedBanner}>
        <View>
          <TouchableOpacity style={styles.crossButton} onPress={props.closeModal}>
            <BannerCloseIcon style={styles.crossIcon} color="#777778" />
          </TouchableOpacity>

          {props.completeOtherExercise ?
            <View style={{ alignItems: 'center' }}>
              <View>
                <Image style={{ alignSelf: 'center', height: 78, width: 84, marginTop: 1 }} resizeMode='contain' source={banneractivitylockedImage} />
                <Text style={{ fontSize: 20, textAlign: 'center', paddingLeft: 40, paddingRight: 40, color: '#FFFFFF', marginTop: 20, fontFamily: Theme.FONT_BOLD }}>This exercise is still locked!</Text>
                <Text style={{ fontSize: 15, textAlign: 'center', paddingLeft: 40, paddingRight: 40, color: '#FFFFFF', marginTop: 20, fontFamily: Theme.FONT_REGULAR }}>Complete the order exercise first</Text>
              </View>
              <TouchableOpacity style={[styles.modalButton, styles.continueButton]} onPress={props.closeModal}>
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: Theme.FONT_BOLD }}>Continue</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={{ alignItems: 'center' }}>
              <View>
                <Image style={{ alignSelf: 'center', height: 78, width: 84, marginTop: 1 }} resizeMode='contain' source={bannerpaymentlockedImage} />
                <Text style={{ fontSize: 18, textAlign: 'center', paddingLeft: 40, paddingRight: 40, color: '#FFFFFF', marginTop: 18, fontFamily: Theme.FONT_BOLD }}>This exercise is still locked!</Text>
                <Text style={{ fontSize: 15, textAlign: 'center', paddingLeft: 40, paddingRight: 40, color: '#FFFFFF', marginTop: 20, lineHeight: 22, fontFamily: Theme.FONT_REGULAR }}>To unlock this exercise checkout our attractive Price Plans</Text>
                <Text style={{ fontSize: 15, textAlign: 'center', paddingLeft: 20, paddingRight: 20, color: '#FFFFFF', marginTop: 20, fontFamily: Theme.FONT_REGULAR }}>Subscribe and get 7 Days of full access</Text>
              </View>
              <TouchableOpacity style={[styles.modalButton, styles.subscribeButton]} onPress={props.subscribeButton}>
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: Theme.FONT_BOLD }}>Subscribe here</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.nothanksButton]} onPress={props.closeModal}>
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: Theme.FONT_SEMIBOLD }}>No, thanks</Text>
              </TouchableOpacity>
            </View>}

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
    height: 45,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButton: {
    marginTop: 30
  },
  subscribeButton: {
    backgroundColor: '#25B999',
    marginTop: 40,
    borderWidth: 0
  },
  nothanksButton: {
    marginTop: 15
  }
})