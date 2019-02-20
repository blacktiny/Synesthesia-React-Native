import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import PlayIcon from '../icons/PlayIcon'
import PauseIcon from '../icons/PauseIcon'
import ProgressCircle from 'react-native-progress-circle'

class ProgressPlayButton extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      btnPressStatus: false,
      onPress: this.props.onPress
    }
  }

  onClicked = () => {
    this.state.onPress();
  };

  onHideUnderlay() {
    this.setState({ btnPressStatus: false });
  }

  onShowUnderlay() {
    this.setState({ btnPressStatus: true });
  }

  render() {
    const { play, progress, disabled } = this.props;
    const { btnPressStatus } = this.state;
    return (
      <TouchableHighlight disabled={disabled} style={styles.container} onPress={() => this.onClicked()} onHideUnderlay={() => this.onHideUnderlay()} onShowUnderlay={() => this.onShowUnderlay()}>
        <ProgressCircle
          percent={progress}
          radius={44}
          borderWidth={8}
          color={ "#595959" }
          shadowColor="#454545"
          bgColor={ "#383938" }
        >
          {play ? <PauseIcon fill={  "white" } /> : <PlayIcon fill={ "white" } small />}
        </ProgressCircle>
      </TouchableHighlight>
    )
  }
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