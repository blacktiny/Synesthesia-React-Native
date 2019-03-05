import React from 'react'
import { Modal, View, ImageBackground, StyleSheet, Text, TouchableHighlight } from 'react-native'
import Button from './Button'
export default CloseModal = (props) => (
  <Modal
    animationType="fade"
    transparent={false}
    visible={props.modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}>
    {props.children}
  </Modal>
)

styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  content: {
    width: '90%',
    height: '30%',
    backgroundColor: '#3d3d3e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 12
  },
  text: {
    fontWeight: 'bold',
    lineHeight: 28,
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  },
  buttonText: {
    fontWeight: 'bold',
    lineHeight: 19,
    fontSize: 16,
    textAlign: 'center',

    color: '#FFFFFF'
  },
  leftButton: {
    width: "45%",
    height: 40,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {
    width: "45%",
    height: 40,
    borderRadius: 18,
    backgroundColor: '#25b999',
    borderColor: '#25b999',
    alignItems: 'center',
    justifyContent: 'center',
  }
})