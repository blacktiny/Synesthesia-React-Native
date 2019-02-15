import React, { Component } from "react";
import { View } from "react-native";

import LinearGradient from "react-native-linear-gradient";

class ProgressBar extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      bAnimate: true,
      value: this.props.value,
      progress: 0,
      width: this.props.width,
      height: this.props.height,
      color1: this.props.color1,
      color2: this.props.color2,
      backgroundColor: this.props.backgroundColor
    };
  }

  animate() {
    const { value } = this.state;
    
      setInterval(() => {
        let nextProgress = 0;
        const { progress } = this.state;
        nextProgress = (value / 20) + progress;
        if (nextProgress > value) {
          nextProgress = value;
          clearInterval();
        }
        if (this._isMounted) {
          this.setState({progress: nextProgress});
        }
      }, 20);
  }

  componentDidMount() {
    this._isMounted = true;
    this.animate();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { value, width, height, color1, color2, backgroundColor, progress } = this.state;
    return (
      <View style={{ width: width ? width : '100%', height: height ? height : 5, backgroundColor: backgroundColor ? backgroundColor : '#5C5C5C', borderRadius: 12 }}>
        <LinearGradient
            colors={[color1 ? color1 : '#27BF9E', color2 ? color2 : '#84FAB0']}
            start={{ x: 1.0, y: 0.5 }} end={{ x: 0.0, y: 0.5 }}
            style={{ width: progress + '%', height: height ? height : 5, borderRadius: 12 }}
          >
        </LinearGradient>
      </View>
    );
  }
}

export default ProgressBar;
