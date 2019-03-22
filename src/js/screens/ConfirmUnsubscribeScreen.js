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

import { unsubscribe } from '../actions/SubscriptionAction';
import CarouselSlider from "../components/CarouselSlider";

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

  onNoBtnClicked = () => { };

  onYesBtnClicked = () => { };

  onUnsubscribe = () => {
    this.props.dispatch(unsubscribe());
  }
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#1F1F20" }}>
        <ScrollView style={styles.main} scrollEnabled={true}>
          <Text style={styles.unsubscribe}>
            {"Are you sure you want to unsubscribe?"}
          </Text>
          <Text style={styles.desciption}>
            <Text style={styles.bold}>{"A regular meditation practice can be challenging"}</Text>{", we know."}
          </Text>
          <Text style={styles.desciption}>
            {"If you unsubscribe, you may miss out of the many benefits of Synesthesia Meditation here in the Sensorium."}
          </Text>
          <CarouselSlider />
          <Text style={styles.sliderDesciption}>
            {"If you unsubscribe,"} <Text style={styles.bold}>{"you still have access"}</Text>{" to all the Synesthesia Meditation activities"} <Text style={styles.bold}>{" until your paid period ends"}</Text>{"."}
          </Text>
          <TouchableOpacity style={[styles.modalButton, styles.nothanksButton]} onPress={() => this.props.navigation.navigate('User')}>
            <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: Theme.FONT_SEMIBOLD }}>{'Stay subscribed'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.unsubscribeButton]} onPress={this.onUnsubscribe}>
            <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: Theme.FONT_BOLD }}>{'Unsubscribe'}</Text>
          </TouchableOpacity>
          <View style={{ width: '100%', height: 150 }} />
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
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    textAlign: "left",
    paddingTop: 10,
    paddingBottom: 10
  },
  bold: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 16,
    color: "white",
  },
  sliderDesciption: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    textAlign: "left",
  },
  modalButton: {
    width: '100%',
    height: 50,
    borderWidth: 2,
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
    marginTop: 20,
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
