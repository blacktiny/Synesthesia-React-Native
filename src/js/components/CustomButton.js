import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native'
import { Theme } from '../constants/constants'

const CustomButton = ({
  title,
  onPress,
  disabled,
  style,
}) => {

  return (
    <TouchableHighlight
      onPress = {onPress}
      disabled = {disabled}
      style = {style ? style : [
        styles.button,
        disabled && { opacity: 0.7 }
      ]}
      underlayColor={'#25B999CC'}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableHighlight>
  )


}

CustomButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.any,
  style: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  button: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    borderRadius: 45,
    backgroundColor: '#25B999',
  },
  title: {
    fontFamily: Theme.FONT_BOLD,
    color: '#fff',
    fontSize: 17,
  }
})

export default CustomButton
