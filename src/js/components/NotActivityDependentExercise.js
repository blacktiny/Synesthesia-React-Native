import React, { Component } from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Image,
  Text,
  View
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import { Theme } from "../constants/constants";
import FastImage from "react-native-fast-image";

const tick = require("../../assets/tick.png");
const lock1 = require("../../assets/lock1.png");
const lock2 = require("../../assets/lock2.png");
const redLock = require("../../assets/red_lock.png");
const greenPlayIconNotCompleted = require("../../assets/greenPlayIconNotCompleted.png");
const greyPlayIconNotCompleted = require("../../assets/greyPlayIconNotCompleted.png");
const purplePlayIconNotCompleted = require("../../assets/purplePlayIconNotCompleted.png");
import { BoxShadow } from 'react-native-shadow'

class NotActivityDependentExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      index: this.props.index,
      numberCount: this.props.numberCount,
      item: this.props.item,
      userType: this.props.userType,
      onLeafClicked: this.props.onPress,
      onClickedFlg: false
    };
  }

  onClicked = () => {
    this.setState({ onClickedFlg: true });
    this.state.onLeafClicked();
  };

  render() {
    const { id, index, numberCount, item, userType, onClickedFlg } = this.state;
    let icon = item.is_done == "1" ? purplePlayIconNotCompleted : item.is_locked != "0" ? greyPlayIconNotCompleted : greenPlayIconNotCompleted;
    const shadowOpt = {
      width: 80,
      height: 80,
      color: "#0e0d0d",
      border: 10,
      radius: 40,
      opacity: 0.6,
      x: 0,
      y: 5
    }
    return (
      <View>

        <View key={id} style={{ width: 117, alignItems: "flex-start", marginTop: 10, marginLeft: 0, marginBottom: 10, marginRight: 0 }}>

          <BoxShadow setting={shadowOpt}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: '#1F1F20',
                width: 80,
                height: 80,
                borderRadius: 50
              }}
            >

              <TouchableHighlight
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                underlayColor={'#ffffff18'}
                onPress={() => this.onClicked()}
              >

                <LinearGradient
                  start={{ x: 0.17, y: 0.85 }} end={{ x: 0.67, y: 0.44 }}
                  locations={[0, 1]}
                  colors={['#505052', '#3D3D3E']}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50
                  }}>

                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 50
                    }}>
                    <FastImage
                      style={{
                        height: 30,
                        width: 30,
                        position: "absolute",
                        top: 25,
                        left: 28,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                      source={icon}
                    />

                  </View>

                </LinearGradient>


              </TouchableHighlight>


              {item.is_locked != '0' &&
                <FastImage
                  style={{
                    height: 33,
                    width: 33,
                    alignSelf: "flex-end",
                    position: "absolute",
                    top: 53,
                    left: 56
                  }}
                  source={lock1}
                >
                  <FastImage
                    style={{
                      alignSelf: "center",
                      height: 14,
                      width: 14,
                      marginTop: 9
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                    source={redLock}
                  />
                </FastImage>}

              {item.is_done == '1' &&
                <FastImage
                  style={{
                    height: 33,
                    width: 33,
                    alignSelf: "flex-end",
                    position: "absolute",
                    top: 53,
                    left: 56
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  source={tick}
                />}
            </View>
          </BoxShadow>
        </View>
        <View style={{
          marginLeft: -5,
          marginTop: 10,
        }}>
          <Text
            style={{
              fontFamily: Theme.FONT_SEMIBOLD,
              textAlign: "center",
              fontSize: 14,
              width: 95,
              paddingLeft: 5,
              paddingRight: 5,
              color: (item.is_locked != "0") ? "rgba(255, 255, 255, 0.4)" : "#FFFFFF"
            }}
          >
            {item.name}
          </Text>
        </View>
      </View>
    );
  }
}

export default NotActivityDependentExercise;
