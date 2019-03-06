import React, { Component } from "react";
import { connect } from 'react-redux'
import { BlurView } from 'react-native-blur';

class BlurBackground extends Component {

  render() {
    const { isModalOpened } = this.props;
    return (
      isModalOpened ? <BlurView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
        viewRef={this.props.viewRef}
        blurType="dark"
        blurAmount={10}
        blurRadius={10}
      /> : null
    )
  }
}

function mapStateToProps(state) {
  return {
    isModalOpened: state.blurReducer.isModalOpened
  }
}

export default connect(mapStateToProps)(BlurBackground);