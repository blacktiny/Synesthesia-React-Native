import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

export default Button = props => (
  <TouchableOpacity style={[styles.button, props.style ? props.style : {}]} onPress={() => props.onPress()}>
    {props.children}
  </TouchableOpacity>
)
const styles = StyleSheet.create({
  button: {
    borderRadius: 27.5,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    height: 45,
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
});
