import React from 'react'
import { Text, ScrollView, View, TouchableOpacity, StyleSheet, Modal, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import BannerCloseIcon from '../icons/BannerCloseIcon';
import { Theme } from '../constants/constants';
import { addBlur } from '../actions/BlurAction'

const { width, height } = Dimensions.get('screen');

const PaymentDetailsModal = (props) => {
  if (props.modalVisible) {
    props.dispatch(addBlur())
  }
  return (
    <Modal
      visible={props.modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => console.log('closed')}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBanner}>
          <TouchableOpacity style={styles.crossButton} onPress={props.closeModal}>
            <BannerCloseIcon style={styles.crossIcon} color="#777778" />
          </TouchableOpacity>
          <ScrollView
            style={{ marginTop: 20, paddingRight: 8 }}>
            <Text style={{ fontSize: 18, color: '#FFFFFF', textAlign: 'left', fontFamily: Theme.FONT_BOLD }}>{'Renews automatically, cancels anytime \n'}</Text>

            <Text style={{ fontSize: 16, color: '#FFFFFF', textAlign: 'left', fontFamily: Theme.FONT_REGULAR }}>With your subscription for the Sensorium, you gain
              <Text style={{ fontFamily: Theme.FONT_BOLD }}> a free 7-day trial</Text>. Today, you will not be billed anything. {'\n'} </Text>

            <Text style={{ fontSize: 16, color: '#FFFFFF', textAlign: 'left', fontFamily: Theme.FONT_REGULAR }}>If you do not cancel within this period, the 7-day free trial will
                <Text style={{ fontFamily: Theme.FONT_BOLD }}> automatically transform into a paid subscription</Text>. {'\n'}</Text>

            <Text style={{ fontSize: 16, color: '#FFFFFF', textAlign: 'left', fontFamily: Theme.FONT_REGULAR }}>Subscriptions <Text style={{ fontFamily: Theme.FONT_BOLD }}> renew automatically</Text> for your convenience. <Text style={{ fontFamily: Theme.FONT_BOLD }}> Cancel anytime</Text>.{'\n'}</Text>

            <Text style={{ fontSize: 16, color: '#FFFFFF', textAlign: 'left', fontFamily: Theme.FONT_REGULAR }}>If you cancel your subscription <Text style={{ fontFamily: Theme.FONT_BOLD }}>continues until the end</Text> of the subscribed period.{'\n'}</Text>

            <Text style={{ fontSize: 16, color: '#FFFFFF', textAlign: 'left', fontFamily: Theme.FONT_REGULAR }}>{'Yearly subscriptions are billed annualy and monthly are billed monthly.'}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal >
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    ...Platform.select({
      ios: {
        height: height - 280,
      },
      android: {
        height: height - 140
      },
    }),
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: '15%',
      },
      android: {
        top: '12%',
      },
    }),
  },
  modalBanner: {
    borderRadius: 12,
    paddingRight: 30,
    paddingLeft: 25,
    paddingBottom: 40,
    backgroundColor: '#383938',
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
})

export default connect(null, null)(PaymentDetailsModal);
