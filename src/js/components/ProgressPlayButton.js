import { PropTypes } from 'prop-types';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import PlayIcon from '../icons/PlayIcon'
import PauseIcon from '../icons/PauseIcon'
import ProgressCircle from 'react-native-progress-circle'

const ProgressPlayButton = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
      <ProgressCircle
        percent={props.progress}
        radius={44}
        borderWidth={8}
        color="#595959"
        shadowColor="#454545"
        bgColor="#383938"
      >
        {props.play ? <PauseIcon /> : <PlayIcon small />}
      </ProgressCircle>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#454545',
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 57
  },
});

export default ProgressPlayButton;