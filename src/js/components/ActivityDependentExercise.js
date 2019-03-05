import React, { Component } from "react";
import {
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

class ActivityDependentExercise extends Component {
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
    return (
      <View key={id} style={{ width: 117, alignItems: "flex-start", marginTop: 10, marginLeft: 0, marginRight: 0 }}>

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
            elevation: 2,
          }}
        >

          {
            ((item.is_free == "1" || userType > '0') &&
              item.is_locked == "0"
              && item.is_done == "0")

              ?
              <TouchableHighlight
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  backgroundColor: "#383938",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}
                underlayColor={'#ffffff18'}
                onPress={() => this.onClicked()}
              >

                <LinearGradient
                  start={{ x: 0.19, y: 0.87 }} end={{ x: 0.81, y: 0.15 }}
                  locations={[0, 1]}
                  colors={['#27BF9E', '#84FAB0']}
                  style={{ borderRadius: 50 }}>
                  <View style={{
                    width: 73,
                    height: 73,
                    margin: 4,
                    backgroundColor: "#383938",
                    borderRadius: 50
                  }}>
                    <Text style={{
                      fontSize: 27,
                      position: "absolute",
                      top: 18,
                      left: 29,
                      fontFamily: Theme.FONT_BOLD,
                      color: "#ffffff"
                    }}>
                      {item.number}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableHighlight>

              :

              <View>
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
                      <Text style={{
                        position: "absolute",
                        top: 21,
                        left: 32,
                        fontSize: 27,
                        fontFamily: Theme.FONT_BOLD,
                        color:

                          item.is_locked > "0"
                            ? "#5F605F"
                            : "#ffffff"
                      }}>
                        {item.number}
                      </Text>

                    </View>
                  </LinearGradient>
                </TouchableHighlight>

                {(item.is_locked != '0' && item.is_free == '1') || (userType > '0' && item.is_done != "1") ?
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
                        height: 41,
                        width: 41,
                        marginTop: 3
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                      source={lock2}
                    />
                  </FastImage>
                  :
                  item.is_done == "1" ?
                    <FastImage
                      style={{
                        height: 33,
                        width: 33,
                        alignSelf: "flex-end",
                        position: "absolute",
                        top: 53,
                        left: 56
                      }}
                      source={tick}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    :
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
                    </FastImage>
                }

              </View>

          }
          {index !== numberCount - 1 && (
            <View
              style={{
                width: 37,
                height: 6,
                zIndex: 999,
                backgroundColor: "#383938",
                alignSelf: "center"
              }}
            />
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

export default ActivityDependentExercise;
