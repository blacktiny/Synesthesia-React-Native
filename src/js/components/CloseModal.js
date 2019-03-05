import React from 'react'
import { Modal } from 'react-native'

export default CloseModal = (props) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={props.modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}>
    {props.children}
  </Modal>
)