import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TickLila from '../icons/TickLila';
import { Theme } from '../constants/constants'

class InputTextField extends Component {

  constructor() {
    super();
  }

  showSuccessBorder = () => {
    return (
      <LinearGradient
        start={{ x: 1.0, y: 0.27 }} end={{ x: 0.38, y: 0.95 }}
        locations={[0, 0.99]}
        colors={['#6F58ED', '#AEA2F2']}
        style={styles.linearGradient}>

      </LinearGradient>
    )
  };

  showErrorBorder = () => {
    return (
      <LinearGradient
        start={{ x: 1, y: 1 }} end={{ x: 1, y: 1 }}
        locations={[0, 1]}
        colors={['#DA152C', '#DA152C']}
        style={styles.linearGradient}>

      </LinearGradient>
    )
  };

  showDisabledBorder = () => {
    return (
      <LinearGradient
        start={{ x: 1, y: 1 }} end={{ x: 1, y: 1 }}
        locations={[0, 1]}
        colors={['#777778', '#777778']}
        style={styles.linearGradient}>

      </LinearGradient>
    )
  };

  render() {
    const {
      disabled,
      value,
      placeholder,
      error,
      showSuccessBorder,
      showErrorBorder,
      secureTextEntry
    } = this.props;
    return (
      <View style={styles.textBoxBtnHolder}>
        <TextInput
          onChangeText={(e) => this.props.onChange(e)}
          onBlur={(e) => this.props.onBlur(e)}
          editable={!disabled}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          selectTextOnFocus={!disabled}
          autoCapitalize='none'
          style={[
            styles.inputBox,
            {
              color: disabled ? '#777778' : '#fff',
            },
          ]}
          value={value}
        />
        {showSuccessBorder ? this.showSuccessBorder() : showErrorBorder ? this.showErrorBorder() : this.showDisabledBorder()}

        {showSuccessBorder &&
          <View style={styles.correctInputTick}>
            <TickLila style={styles.tickImage} />
          </View>
        }
        {showErrorBorder && <Text style={styles.rootError}>{error}</Text>}
      </View >
    );

  }
}

const styles = StyleSheet.create({
  linearGradient: {
    height: 2,
    marginBottom: 5
  },
  textBoxBtnHolder: {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  inputBox: {
    height: 40,
    color: '#3d3d3e',
    fontSize: 16,
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0
  },
  correctInputTick: {
    position: 'absolute',
    right: 0,
    height: 25,
    width: 25,
    padding: 5
  },
  tickImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
  rootError: {
    color: '#DA152C',
    marginBottom: 3,
    marginTop: 3,
    opacity: 1,
    fontFamily: Theme.FONT_MEDIUM
  },
});

export default InputTextField;