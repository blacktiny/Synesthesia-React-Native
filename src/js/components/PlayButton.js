import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import PlayIcon from '../icons/PlayIcon'

class PlayButton extends Component {
  
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
    const { btnPressStatus } = this.state;
    return (
      <TouchableHighlight style={styles.container} onPress={() => this.onClicked()} onHideUnderlay={() => this.onHideUnderlay()} onShowUnderlay={() => this.onShowUnderlay()} underlayColor={'#454545'}>
        <View style={[ styles.innerRound, { backgroundColor: btnPressStatus ? '#ffffff0d' : '#383938' } ]}>
          <PlayIcon colors={[ '#27BF9E', '#84FAB0' ]} />
        </View>
      </TouchableHighlight>
    )
  }
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