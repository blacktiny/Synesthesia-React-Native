import React, { Component } from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Image,
  Text,
  View
} from "react-native";
import { Theme } from "../constants/constants";

const tick = require("../../assets/tick.png");
const lock1 = require("../../assets/lock1.png");
const lock2 = require("../../assets/lock2.png");

class CircleItemButton extends Component {
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
    return (
      <View key={id} style={{ width: 90, alignItems: "center", margin: 10 }}>
        <View
          style={{
            flexDirection: "row",
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            shadowColor: "black",
            shadowOpacity: 0.5
          }}
        >
          <TouchableHighlight
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              borderWidth:
                item.is_free == "0" &&
                item.is_locked == "0" &&
                item.is_done != "1"
                  ? 3
                  : 0,
              backgroundColor: "#383938",
              borderColor:
                item.is_free == "0" &&
                item.is_locked == "0" &&
                item.is_done != "1"
                  ? "#27BF9E"
                  : "#383938",
              alignItems: "center",
              justifyContent: "center",
            }}
            underlayColor={'#ffffff18'}
            onPress={() => this.onClicked()}
          >
            <View>
              <Text style={{ fontSize: 27, color: "#545260" }}>
                {item.number}
              </Text>
              {item.is_done == "1" && (
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: "flex-end",
                    position: "absolute",
                    top: 30,
                    left: 30
                  }}
                  source={tick}
                />
              )}
              {item.is_locked != "0" && (
                <ImageBackground
                  style={{
                    height: 25,
                    width: 25,
                    alignSelf: "flex-end",
                    position: "absolute",
                    top: 30,
                    left: 30
                  }}
                  source={lock1}
                >
                  <Image
                    style={{
                      alignSelf: "center",
                      height: 33,
                      width: 33,
                      marginTop: 1
                    }}
                    resizeMode="contain"
                    source={lock2}
                  />
                </ImageBackground>
              )}
            </View>
          </TouchableHighlight>
          {index !== numberCount - 1 && (
            <View
              style={{
                width: 30,
                height: 5,
                backgroundColor: "#383938",
                alignSelf: "center"
              }}
            />
          )}
          {index === numberCount - 1 && <View style={{ paddingRight: 27 }} />}
        </View>
        <View style={{ marginRight: 20, width: 90, marginTop: 10 }}>
          <Text
            style={{
              fontFamily: Theme.FONT_SEMIBOLD,
              textAlign: "center",
              fontSize: 14,
              color: !item.is_locked != "0" ? "#FFFFFF" : "#707070"
            }}
          >
            {item.name}
          </Text>
        </View>
      </View>
    );
  }
}

export default CircleItemButton;
