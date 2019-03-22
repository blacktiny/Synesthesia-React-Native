import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Linking
} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import CarouselSlider from "../components/CarouselSlider";

import { Theme } from "../constants/constants";

const { width, height } = Dimensions.get("screen");

const backgroundImage = require("../../assets/kiwihug-266154-unsplash.png");
import DollarSign from '../icons/DollarSign';
import BottomBar from '../components/BottomBar';

import { openPaymentDetailsModal, openRegisterModal } from '../actions/ToggleFormModalAction';

import { addBlur, removeBlur } from '../actions/BlurAction'

class PricingScreen extends Component {
  constructor() {
    super();

    this.state = {
      subScriptDate: "06/12/2018",
      bSubScription: false,
      subScriptType: 1,
      monthlyPrice: 4.99,
      yearlyPrice: 2.99,
      size: { width, height },
    };
  }

  getFloat2String = price => {
    var strPrice = price.toString();
    strPrice = strPrice.replace(".", ",");
    return strPrice;
  };

  onCancelSubScriptionClicked = () => {
    this.setState({ bSubScription: false });
  };

  onSubscriptionClicked = (subTier) => {
    this.props.dispatch(addBlur())
    this.props.dispatch(openRegisterModal(subTier))
  }

  render() {
    const {
      monthlyPrice,
      yearlyPrice
    } = this.state;
    const strMonthlyPrice = this.getFloat2String(monthlyPrice);
    const strYearlyPrice = this.getFloat2String(yearlyPrice);

    let moreDetailsSec;

    moreDetailsSec = (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 80 }}>
        <Text onPress={() => { this.props.dispatch(openPaymentDetailsModal()) }} style={styles.moreDetails}>More Payment Details </Text>
        <Text style={styles.moreDetailsAndWord}>and </Text>
        <Text onPress={() => { Linking.openURL('https://synesthesia.com/#/faq') }} style={styles.moreDetails}>FAQ</Text>
      </View>
    );

    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        {/* <BottomBar screen={'Pricing'} navigation={this.props.navigation} /> */}

        <ScrollView
          style={styles.main}
          scrollEnabled={true}
        >
          <ImageBackground style={styles.backgroundImage} source={backgroundImage} blurRadius={9.63}>
            <View style={styles.backgroundColor}>
            </View>
            <LinearGradient
              colors={["rgba(18, 16, 30, 0)", "rgba(18, 16, 30, 0)", "rgba(18, 16, 30, 0)", "#1E1E1E", "#1E1E1E", "#1E1E1E", "#1E1E1E", "#1E1E1E", "#1E1E1E"]}
              style={styles.backgroundLinearGradient}
            >
            </LinearGradient>

            <View>
              <Text style={styles.meditateFree}>Meditate 7 days for free</Text>

              <View style={styles.btnSection}>
                <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["#725BEE", "#725BEE", "#AEA2F2"]}
                  style={styles.LinearGradient}
                >
                  <TouchableOpacity
                    style={[styles.btn, styles.btnMonthly, { alignItems: "center", }]}
                    onPress={() => this.onSubscriptionClicked('monthly')}
                  >
                    <Text style={styles.billType}>MONTHLY</Text>
                    <View style={{
                      flexDirection: 'row', flexWrap: 'wrap'
                    }}>
                      <DollarSign style={styles.dollarSign} width={20} height={34} viewBox={'0 0 20 34'} opacity={0.85} /><Text style={styles.pricePerMonth}>{strMonthlyPrice}</Text>
                    </View>
                    <Text style={styles.perMonth}>per month</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <View style={{ width: 15 }} />
                <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["#0060EB", "#006CED", "#00C2FB"]}
                  style={styles.LinearGradient}
                >
                  <TouchableOpacity
                    style={[styles.btn, styles.btnYearly, { alignItems: "center" }]}
                    onPress={() => this.onSubscriptionClicked('yearly')}
                  >
                    <Text style={styles.billType}>YEARLY</Text>
                    <View style={{
                      flexDirection: 'row', flexWrap: 'wrap'
                    }}>
                      <DollarSign style={styles.dollarSign} width={20} height={34} viewBox={'0 0 20 34'} opacity={0.5} /><Text style={styles.pricePerMonth}>{strYearlyPrice}</Text>
                    </View>
                    <Text style={styles.perMonth}>per month</Text>
                    <Text style={styles.billed}>*is billed yearly</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View style={{
                flexDirection: 'row', flexWrap: 'wrap', alignItems: "center", justifyContent: "center"
              }}>
                <Text style={styles.totalBill}>Total bill today: 0</Text><DollarSign style={styles.dollarSign} width={9} height={15} viewBox={'0 0 20 34'} opacity={1} />
              </View>
            </View >

            <CarouselSlider />

            <Text style={styles.txtUpper}>
              Access all Meditations 7 days for free. {"\n"}
              <Text style={{ fontFamily: Theme.FONT_BOLD }}>If you do not like it, simply cancel.</Text>
            </Text>
            <Text style={styles.txtLower}>
              After 7 days your paid subscription starts automatically.
            </Text>

            {moreDetailsSec}

          </ImageBackground>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#1F1F20",
    paddingBottom: 70
  },
  backgroundImage: {
    width: width,
    padding: 15,
    paddingTop: 10
  },
  backgroundColor: {
    position: 'absolute',
    width: width,
    height: 920,
    backgroundColor: "#1F1F1F",
    opacity: 0.68
  },
  backgroundLinearGradient: {
    position: 'absolute',
    width: width,
    height: 920
  },
  meditateFree: {
    paddingBottom: 13,
    paddingTop: 13,
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontFamily: Theme.FONT_BOLD
  },
  totalBill: {
    fontSize: 16,
    color: "white",
    marginTop: 12,
    marginBottom: 12,
    textAlign: "center",
    fontFamily: Theme.FONT_BOLD
  },
  btnSection: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: "black",
    shadowOpacity: 0.47,
    elevation: 2
  },
  LinearGradient: {
    borderRadius: 12
  },
  btn: {
    width: width / 2 - 25,
    height: 160,
    color: "white",
    backgroundColor: "transparent",
    borderRadius: 12,
  },
  billType: {
    fontFamily: Theme.FONT_SEMIBOLD,
    fontSize: 15,
    color: "white",
    letterSpacing: 1,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: "center"
  },
  pricePerMonth: {
    fontSize: 35,
    textAlign: "center",
    color: "white",
    paddingTop: 0,
    fontFamily: Theme.FONT_BOLD
  },
  perMonth: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 15,
    textAlign: "center",
    color: "white",
    paddingTop: 3
  },
  billed: {
    fontFamily: Theme.FONT_MEDIUM,
    fontSize: 13,
    textAlign: "center",
    color: "white",
    paddingTop: 15
  },
  txtUpper: {
    fontSize: 16,
    color: "white",
    lineHeight: 25,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: Theme.FONT_LIGHT
  },
  txtLower: {
    fontFamily: Theme.FONT_LIGHT,
    fontSize: 16,
    color: "white",
    lineHeight: 25,
    marginTop: 5,
    marginBottom: 10
  },
  moreDetails: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 16,
    color: "#25B999",
    lineHeight: 24
  },
  moreDetailsAndWord: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 16,
    color: "#fff",
    lineHeight: 24
  },
  dollarSign: {
    resizeMode: 'cover',
    alignSelf: 'center',
    marginRight: 3,
    marginLeft: 3
  }
});

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  null
)(PricingScreen);
