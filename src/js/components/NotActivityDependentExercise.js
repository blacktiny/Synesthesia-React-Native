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

const tick = require("../../assets/tick.png");
const lock1 = require("../../assets/lock1.png");
const lock2 = require("../../assets/lock2.png");
const greenPlayIconNotCompleted = require("../../assets/greenPlayIconNotCompleted.png");
const greyPlayIconNotCompleted = require("../../assets/greyPlayIconNotCompleted.png");
const purplePlayIconNotCompleted = require("../../assets/purplePlayIconNotCompleted.png");

class NotActivityDependentExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      index: this.props.index,
      numberCount: this.props.numberCount,
      item: this.props.item,
      onLeafClicked: this.props.onPress,
      onClickedFlg: false
    };
  }

  onClicked = () => {
    this.setState({ onClickedFlg: true });
    this.state.onLeafClicked();
  };

  render() {
    const { id, index, numberCount, item, onClickedFlg } = this.state;
    let icon = item.is_done == "1" ? purplePlayIconNotCompleted : item.is_locked != "0" ? greyPlayIconNotCompleted : greenPlayIconNotCompleted;
    return (
      <View key={id} style={{ width: 117, alignItems: "flex-start", marginTop: 10, marginLeft: 0, marginBottom: 10, marginRight: 0 }}>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: '#1F1F20',
            width: 80,
            height: 80,
            borderRadius: 50,
            shadowRadius: 7,
            shadowOffset: { width: 0, height: 2 },
            shadowColor: "#000",
            shadowOpacity: 0.5,
            elevation: 1
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
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    position: "absolute",
                    top: 25,
                    left: 28,
                    resizeMode: 'contain'
                  }}
                  source={icon}
                />

              </View>

            </LinearGradient>


          </TouchableHighlight>

          {item.is_done == "1" && (
            <Image
              style={{
                height: 33,
                width: 33,
                alignSelf: "flex-end",
                position: "absolute",
                top: 53,
                left: 56
              }}
              source={tick}
            />
          )}
          {item.is_locked != "0" && (
            <ImageBackground
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
              <Image
                style={{
                  alignSelf: "center",
                  height: 41,
                  width: 41,
                  marginTop: 3
                }}
                resizeMode="contain"
                source={lock2}
              />
            </ImageBackground>
          )}


        </View>
        <View style={{
          position: 'absolute',
          width: 120,
          paddingRight: 18,
          paddingLeft: 18,
          top: 90,
          left: -20
        }}>
          <Text
            style={{
              fontFamily: Theme.FONT_SEMIBOLD,
              textAlign: "center",
              fontSize: 14,
              color: (item.is_locked != "0" || item.is_done == "1") ? "rgba(255, 255, 255, 0.4)" : "#FFFFFF"
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
