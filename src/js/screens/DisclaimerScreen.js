import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Linking, Dimensions } from 'react-native'
import { Theme } from '../constants/constants'

const { width, height } = Dimensions.get('window');
import ModalCloseIcon from '../icons/ModalCloseIcon';
import { iPhoneX } from '../../js/util';

class DisclaimerScreen extends Component {
  render() {
    return (
      <View style={styles.disclaimerContainer}>
        <View style={styles.disclaimerContent}>
          <TouchableOpacity style={styles.crossButton} onPress={() => this.props.navigation.navigate('Sensorium')}>
            <ModalCloseIcon style={styles.crossIcon} color="#777778" />
          </TouchableOpacity>
          <Text style={{ fontFamily: Theme.FONT_REGULAR, fontSize: 17, color: "#fff" }}>
            The science of synesthesia, mindfulness, as well as synesthetic training
              is still in its infancy. Mindful synesthetic awareness is subjective and
              varies from person to person. There is no guarantee that you achieve synesthetic
              experiences with Synesthesia Meditation. You must try it out yourself to find
              out if you resonate with Synesthesia and if the practices are beneficial for you.
              Check our
                <Text onPress={() => { Linking.openURL('https://synesthesia.com/#/faq') }}>
              <Text style={{ fontFamily: Theme.FONT_REGULAR, color: '#25B999' }}>
                {' FAQ '}
              </Text>
            </Text>
            and read more in our
                <Text onPress={() => { Linking.openURL('https://synesthesia.com/blog') }}>
              <Text style={{ fontFamily: Theme.FONT_REGULAR, color: '#25B999' }}>
                {' Blog'}
              </Text>
            </Text>
            .
          </Text>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  crossIcon: {
    alignSelf: 'flex-end',
    marginRight: -12,
    marginTop: 10,
    resizeMode: 'contain'
  },
  crossButton: {
    paddingRight: 8,
    paddingTop: 5
  },
  disclaimerContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  disclaimerContent: {
    width: '93%',
    backgroundColor: '#3D3D3E',
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    borderColor: '#3D3D3E',
    borderWidth: 1
  }
});

export default DisclaimerScreen;