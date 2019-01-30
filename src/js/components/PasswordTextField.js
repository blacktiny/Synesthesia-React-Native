import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { TextInput, Text, Image, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EyeOpened from '../icons/EyeOpened';
import EyeClosed from '../icons/EyeClosed';

class PasswordTextField extends Component {

  constructor() {
    super();

    this.state = {
      hidePassword: true,
      textInputPassword: ''
    }
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
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
        colors={['#D32439', '#D32439']}
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
      showErrorBorder
    } = this.props;
    return (
      <View>
        <View style={styles.textBoxBtnHolder}>
          <TextInput
            onChangeText={(e) => {
              this.setState({ textInputPassword: e })
              this.props.onChange(e)
            }}
            onBlur={(e) => this.props.onBlur(e)}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            value={value}
            underlineColorAndroid="transparent"
            secureTextEntry={this.state.hidePassword}
            autoCapitalize='none'
            style={[
              styles.textBox,
              {
                color: disabled ? '#777778' : '#fff',
              },
            ]}
          />

          {showSuccessBorder ? this.showSuccessBorder() : showErrorBorder ? this.showErrorBorder() : this.showDisabledBorder()}

          {this.state.textInputPassword.length > 0 && <TouchableOpacity
            activeOpacity={0.8}
            style={styles.visibilityBtn}
            onPress={this.managePasswordVisibility}>

            {this.state.hidePassword ? <EyeClosed style={styles.btnImage} /> : <EyeOpened style={styles.btnImage} />}

          </TouchableOpacity>}
        </View>
        {showErrorBorder && <Text style={styles.rootError}>{error}</Text>}
      </View>

    )
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
    marginTop: 0
  },
  textBox: {
    fontSize: 16,
    alignSelf: 'stretch',
    height: 40,
    paddingVertical: 0,
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 3
  },
  visibilityBtn: {
    position: 'absolute',
    right: 0,
    height: 30,
    width: 30,
    padding: 5
  },
  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },

  rootError: {
    color: '#D32439'
  }
});

export default PasswordTextField;