import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import { Theme } from '../../constants/constants'

const Icon = createIconSetFromFontello(require('./config.json'))

const sizeDifference = 2
const round = (size) => ({
  width: size + sizeDifference + 10 * 2,
  height: size + sizeDifference + 10 * 2,
  padding: 10,
  borderRadius: size + 10
})

export class SvgIcon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    size: PropTypes.number,
    padding: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    opacity: PropTypes.number,
    rotate: PropTypes.number,
    preset: PropTypes.string,
    backgroundColor: PropTypes.string,
    color: PropTypes.any,
    enabled: PropTypes.bool,
    minHeight: PropTypes.number
  }
  
  static defaultProps = {
    name: '',
    onPress: () => {}
  }

  render () {
    const {
      name,
      size = 24,
      padding = 0,
      marginLeft = 0,
      marginRight = 0,
      color = Theme.primaryColor,
      opacity = 1,
      rotate = 0,
      onPress,
      preset = 'default',
      backgroundColor = 'transparent',
      enabled = true,
      minHeight,
      ...rest
    } = this.props

    return (
      <View style={[{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        minHeight,
        marginLeft,
        marginRight
      }, preset === 'round' && round(size)]}>
        <Icon
          name={name}
          enabled={enabled}
          onPress={onPress}
          color={color}
          style={{
            alignItems: 'center',
            opacity,
            fontSize: size,
          }}
        />
      </View>
    )
  }
}
