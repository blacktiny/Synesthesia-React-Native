import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { connect } from "react-redux";

import { Theme } from "../constants/constants";

const unsubscribe_1 = require("../../assets/unsubscribe_1.png");
const unsubscribe_2 = require("../../assets/unsubscribe_2.png");
const unsubscribe_3 = require("../../assets/unsubscribe_3.png");

const { width, height } = Dimensions.get("screen");

class ConfirmUnsubscribeScreen extends Component {
  constructor() {
    super();

    this.state = {};
  }

  onHideUnderlay(itemName) {
    if (itemName == "addCard") {
      this.setState({ addBtnPressStatus: false });
    } else if (itemName == "editCard") {
      this.setState({ editBtnPressStatus: false });
    }
  }

  onShowUnderlay(itemName) {
    if (itemName == "addCard") {
      this.setState({ addBtnPressStatus: true });
    } else if (itemName == "editCard") {
      this.setState({ editBtnPressStatus: true });
    }
  }

  onNoBtnClicked = () => {};

  onYesBtnClicked = () => {};

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#1F1F20" }}>
        <ScrollView style={styles.main} scrollEnabled={true}>
          <Text style={styles.unsubscribe}>
            {"Are you sure you want to unsubscribe?"}
          </Text>
          <Text style={styles.desciption}>
            {"If you unsubscribe, you still have access to all the Synesthesia Meditation activities until your paid period ends"}
          </Text>
          <View style={styles.ImageSection}>
            <Image source={unsubscribe_1} />
            <Text style={styles.imageDesciption}>
              {"Over 30 hours of mindful Synesthetic activities."}
            </Text>
          </View>
          <View style={styles.ImageSection}>
            <Image source={unsubscribe_2} />
            <Text style={styles.imageDesciption}>
              {"Sharpen your synesthetic senses"}
            </Text>
          </View>
          <View style={styles.ImageSection}>
            <Image source={unsubscribe_3} />
            <Text style={styles.imageDesciption}>
              {"A break for your body and mind in your busy life"}
            </Text>
          </View>
          <TouchableOpacity style={[styles.modalButton, styles.nothanksButton]} onPress={() => this.props.navigation.navigate('User')}>
            <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: Theme.FONT_SEMIBOLD }}>{'No, I don`t want to'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.unsubscribeButton]} onPress={() => console.log('Unsubscribe')}>
            <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: Theme.FONT_BOLD }}>{'Yes, I want to'}</Text>
          </TouchableOpacity>
          <View style={{width: '100%', height: 150}} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#1F1F20",
    padding: 15
  },
  unsubscribe: {
    width: "70%",
    fontFamily: Theme.FONT_BOLD,
    fontSize: 22,
    lineHeight: 28,
    color: "white",
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  desciption: {
    width: width - 30,
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  ImageSection: {
    alignSelf: "center"
  },
  imageDesciption: {
    width: width - 30,
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    alignSelf: "center",
    paddingLeft: 15,
    paddingRight: 15
  },
  modalButton: {
    width: width - 100,
    height: 45,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  unsubscribeButton: {
    marginTop: 15
  },
  nothanksButton: {
    backgroundColor: '#25B999',
    marginTop: 40,
    borderWidth: 0
  }
});

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  null
)(ConfirmUnsubscribeScreen);
