import { PropTypes } from 'prop-types';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import PlayIcon from '../icons/PlayIcon'
const PlayButton = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.onPress()}>
      <View style={styles.innerRound}>
        <PlayIcon colors={['#27BF9E', '#84FAB0']} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#454545',
    width: 114,
    height: 114,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 57
  },
  innerRound: {
    backgroundColor: '#383938',
    width: 91,
    height: 91,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 46
  }
});

export default PlayButton;