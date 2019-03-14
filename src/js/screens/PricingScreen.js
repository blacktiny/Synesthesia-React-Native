import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Modal,
  Linking,
  Platform
} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import Carousel from "../components/Carousel";

import { Theme } from "../constants/constants";

const { width, height } = Dimensions.get("screen");

const blueCalendarIcon = require("../../assets/blue_calendar_icon.png");
const lilaCalendarIcon = require("../../assets/lila_calendar_icon.png");
const cancelIcon = require("../../assets/cancel_x.png");
const slider1 = require("../../assets/Slider/slider_1.png");
const slider2 = require("../../assets/Slider/slider_2.png");
const slider3 = require("../../assets/Slider/slider_3.png");
const slider4 = require("../../assets/Slider/slider_4.png");
const slider5 = require("../../assets/Slider/slider_5.png");
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

  onBtnMonthlyClicked = () => {
    this.setState({ bSubScription: true });
    this.setState({ subScriptType: 1 });
  };

  onBtnYearlyClicked = () => {
    this.setState({ bSubScription: true });
    this.setState({ subScriptType: 2 });
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
      subScriptDate,
      bSubScription,
      subScriptType,
      monthlyPrice,
      yearlyPrice
    } = this.state;
    const strMonthlyPrice = this.getFloat2String(monthlyPrice);
    const strYearlyPrice = this.getFloat2String(yearlyPrice);

    let output, moreDetailsSec, backgroundImage;

    if (bSubScription) {
      backgroundImage = require("../../assets/backgroundColor-black.png");
      if (subScriptType == 1) {
        output = (
          <View>
            <Text style={styles.currentSubScpt}>Your current subScription</Text>

            <View style={styles.subBtnSection}>
              <LinearGradient
                colors={['#AEA2F2', '#725BEE']}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={styles.subGradient}
              >
                <TouchableOpacity style={styles.subBtnYear} onPress={() => this.onSubscriptionClicked('monthly')}>
                  <View style={styles.subBillTypeSection}>
                    <Text style={styles.subBillType}>MONTHLY</Text>
                  </View>
                  <View style={styles.subPriceContent}>
                    <View style={{
                      flexDirection: 'row', flexWrap: 'wrap', justifyContent: "flex-end"
                    }}>
                      <DollarSign style={styles.dollarSign} width={15} height={22} viewBox={'0 0 20 34'} opacity={0.85} /><Text style={styles.subMonthlyPrice}>{strYearlyPrice}</Text>
                    </View>
                    <Text style={styles.subPerMonth}>per month</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <View style={styles.nextBillDate}>
              <Text style={styles.nextBillText}>Next billing date:</Text>
              <View style={styles.datePickerSection}>
                <Image style={styles.calendarIcon} source={lilaCalendarIcon} />
                <Text style={[styles.dateText, styles.colorMonthly]}>
                  {subScriptDate}
                </Text>
              </View>
            </View>

            <View style={styles.moreAndCancelSection}>
              <Text onPress={() => { this.props.dispatch(openPaymentDetailsModal()) }} style={styles.subMoreDetails}>Payment Details</Text>
              <Text
                style={styles.subCancelScription}
                onPress={() => this.onCancelSubScriptionClicked()}
              >
                <Image style={styles.cancelIcon} source={cancelIcon} /> Cancel
                Subscription
              </Text>
            </View>
          </View>
        );
      } else {
        output = (
          <View>
            <Text style={styles.meditateFree}>7-day free trial</Text>
            <Text style={styles.txtSubscpt}>
              Your paid subscription starts after this date:
            </Text>

            <View style={[styles.datePickerSection, styles.datePickerMargin]}>
              <Image style={styles.calendarIcon} source={blueCalendarIcon} />
              <Text style={styles.dateText}>
                {subScriptDate}
              </Text>
            </View>
            <View style={styles.subBtnSection}>
              <LinearGradient
                colors={["#00C2FB", "#00AAF7", "#0092F3", "#0078EF", "#0060EB"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={styles.subGradient}
              >
                <TouchableOpacity style={styles.subBtnYear} onPress={() => this.onSubscriptionClicked('yearly')}>
                  <View style={styles.subBillTypeSection}>
                    <Text style={styles.subBillType}>YEARLY</Text>
                  </View>
                  <View style={styles.subPriceContent}>
                    <View style={{
                      flexDirection: 'row', flexWrap: 'wrap', justifyContent: "flex-end"
                    }}>
                      <DollarSign style={styles.dollarSign} width={15} height={22} viewBox={'0 0 20 34'} opacity={0.85} /><Text style={styles.subYearlyPrice}>{strYearlyPrice}</Text>
                    </View>
                    <Text style={styles.subPerMonth}>per month</Text>
                    <Text style={styles.subBilled}>*Billed Annually</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <View style={styles.moreAndCancelSection}>
              <Text onPress={() => { this.props.dispatch(openPaymentDetailsModal()) }} style={styles.subMoreDetails}>Payment Details</Text>
              <Text
                style={styles.subCancelScription}
                onPress={() => this.onCancelSubScriptionClicked()}
              >
                <Image style={styles.cancelIcon} source={cancelIcon} /> Cancel
                Subscription
              </Text>
            </View>
          </View>
        );
      }
      moreDetailsSec = <View />;
    } else {
      backgroundImage = require("../../assets/kiwihug-266154-unsplash.png");
      output = (
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
                onPress={() => this.onBtnMonthlyClicked()}
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
                onPress={() => this.onBtnYearlyClicked()}
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
      );
      moreDetailsSec = (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 80 }}>
          <Text onPress={() => { this.props.dispatch(openPaymentDetailsModal()) }} style={styles.moreDetails}>More Payment Details </Text>
          <Text style={styles.moreDetailsAndWord}>and </Text>
          <Text onPress={() => { Linking.openURL('https://synesthesia.com/#/faq') }} style={styles.moreDetails}>FAQ</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <BottomBar navigation={this.props.navigation} />

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

            {output}

            <View style={styles.newsCarousel}>
              <Carousel
                delay={2000}
                style={styles.carousel_section}
                autoplay={false}
                bullets
                bulletsContainerStyle={styles.carousel_bulletsContainer}
                currentPage={0}
                onAnimateNextPage={p => console.log(p)}
              >
                <View style={styles.carousel_slider}>
                  <ImageBackground style={styles.slider} source={slider1} borderRadius={12}>
                    <Text style={[styles.sliderText, styles.slider1TextUpper]}>
                      Over 200 original Synesthesia Meditations
                </Text>
                    <Text style={[styles.sliderText, styles.slider1TextLower]}>
                      Increase your sensory awareness in daily life.
                </Text>
                  </ImageBackground>
                </View>
                <View style={styles.carousel_slider}>
                  <ImageBackground style={styles.slider} source={slider2} borderRadius={12}>
                    <Text style={[styles.sliderText, styles.slider2TextUpper]}>
                      Synesthesia Meditation: a unique fusion
                </Text>
                    <Text style={[styles.sliderText, styles.slider2TextLower]}>
                      A mix between traditional meditation, sensory nature awareness
                      techniques and synesthetic exploration.
                </Text>
                  </ImageBackground>
                </View>
                <View style={styles.carousel_slider}>
                  <ImageBackground style={styles.slider} source={slider3} borderRadius={12}>
                    <Text style={[styles.sliderText, styles.slider3TextUpper]}>
                      Re-activate, tune and blend your senses
                </Text>
                    <Text style={[styles.sliderText, styles.slider3TextLower]}>
                      Increase your awareness with mindful synesthetic exercises
                </Text>
                  </ImageBackground>
                </View>
                <View style={styles.carousel_slider}>
                  <ImageBackground style={styles.slider} source={slider4} borderRadius={12}>
                    <Text style={[styles.sliderText, styles.slider4TextUpper]}>
                      Enjoy little more Life Quality
                </Text>
                    <Text style={[styles.sliderText, styles.slider4TextLower]}>
                      Experience your surrounding more aware, less stress, more
                      focus, more happiness, better sleep. Be more present in daily
                      life.
                </Text>
                  </ImageBackground>
                </View>
                <View style={styles.carousel_slider}>
                  <ImageBackground style={styles.slider} source={slider5} borderRadius={12}>
                    <Text style={[styles.sliderText, styles.slider5TextUpper]}>
                      Sensorium – not just another meditation app.
                </Text>
                    <Text style={[styles.sliderText, styles.slider5TextLower]}>
                      Many hours of interactive, multisensory and multimedia
                      activities, exercises and tests.
                </Text>
                  </ImageBackground>
                </View>
              </Carousel>
              <View style={styles.carousel_pagination}>
              </View>
            </View>

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
    // height: height,
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
  currentSubScpt: {
    fontSize: 20,
    color: "white",
    fontFamily: Theme.FONT_BOLD,
    marginTop: 15,
    marginBottom: 15
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
  subBtnSection: {
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: "black",
    shadowOpacity: 0.47,
    elevation: 2
  },
  LinearGradient: {
    borderRadius: 12
  },
  txtSubscpt: {
    fontSize: 15,
    color: "white",
    fontFamily: Theme.FONT_MEDIUM,
    marginTop: 10
  },
  subGradient: {
    width: width - 30,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12
  },
  subBtnYear: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 36,
    height: 90,
    backgroundColor: "#1F1F20",
    borderRadius: 12
  },
  datepicker: {
    marginTop: 12,
    marginBottom: 18
  },
  subBillTypeSection: {
    width: 120,
    height: 90,
    alignItems: "center",
    justifyContent: "center"
  },
  subPriceContent: {
    width: 150,
    height: 90,
    display: "flex",
    flexDirection: "column",
    padding: 13,
    paddingRight: 23
  },
  subBillType: {
    fontFamily: Theme.FONT_SEMIBOLD,
    color: "white",
    fontSize: 18,
    display: "flex",
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
  subMonthlyPrice: {
    fontFamily: Theme.FONT_BOLD,
    display: "flex",
    alignSelf: "flex-end",
    fontSize: 23,
    color: '#917FF0',
    textAlign: "right"
  },
  subYearlyPrice: {
    fontFamily: Theme.FONT_BOLD,
    display: "flex",
    alignSelf: "flex-end",
    fontSize: 23,
    color: '#0096F4',
    textAlign: "right"
  },
  perMonth: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 15,
    textAlign: "center",
    color: "white",
    paddingTop: 3
  },
  subPerMonth: {
    display: "flex",
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 14,
    textAlign: "right",
    color: "white"
  },
  billed: {
    fontFamily: Theme.FONT_MEDIUM,
    fontSize: 13,
    textAlign: "center",
    color: "white",
    paddingTop: 15
  },
  subBilled: {
    fontFamily: Theme.FONT_SEMIBOLD,
    fontSize: 13,
    textAlign: "right",
    color: "#0096F4",
    paddingTop: 3
  },
  nextBillDate: {
    display: "flex",
    flexDirection: "row",
    marginTop: 17,
    marginBottom: 5
  },
  nextBillText: {
    fontFamily: Theme.FONT_MEDIUM,
    fontSize: 16,
    color: "white",
    marginRight: 30
  },
  datePickerSection: {
    display: "flex",
    flexDirection: "row"
  },
  datePickerMargin: {
    marginTop: 12,
    marginBottom: 15
  },
  dateText: {
    fontSize: 16,
    color: "#0080F0",
    marginLeft: 10
  },
  colorMonthly: {
    color: '#917FF0'
  },
  colorYearly: {
    color: '#0096F4'
  },
  newsCarousel: {
    backgroundColor: "#1F1F20",
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 15
  },
  carousel_section: {
    width: width - 30,
    height: 200,
    borderRadius: 12
  },
  carousel_bulletsContainer: {
    top: 165
  },
  carousel_slider: {
    borderRadius: 12
  },
  slider: {
    width: width - 30,
    height: 200,
    display: "flex",
    alignItems: "center",
    borderRadius: 12,
    opacity: 0.8
  },
  sliderText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    lineHeight: 25
  },
  slider1TextUpper: {
    width: width - 95,
    marginTop: 35,
    fontFamily: Theme.FONT_BOLD
  },
  slider1TextLower: {
    width: width - 95,
    marginTop: 12,
    fontFamily: Theme.FONT_REGULAR
  },
  slider2TextUpper: {
    width: width - 95,
    lineHeight: 22,
    marginTop: 30,
    fontFamily: Theme.FONT_BOLD
  },
  slider2TextLower: {
    width: width - 95,
    lineHeight: 22,
    marginTop: 12,
    fontFamily: Theme.FONT_REGULAR
  },
  slider3TextUpper: {
    width: width - 95,
    lineHeight: 22,
    marginTop: 40,
    fontFamily: Theme.FONT_BOLD
  },
  slider3TextLower: {
    width: width - 95,
    lineHeight: 22,
    marginTop: 12,
    fontFamily: Theme.FONT_REGULAR
  },
  slider4TextUpper: {
    width: width - 95,
    lineHeight: 22,
    marginTop: 30,
    fontFamily: Theme.FONT_BOLD
  },
  slider4TextLower: {
    width: width - 95,
    lineHeight: 22,
    marginTop: 12,
    fontFamily: Theme.FONT_REGULAR
  },
  slider5TextUpper: {
    width: width - 95,
    lineHeight: 22,
    marginTop: 40,
    fontFamily: Theme.FONT_BOLD
  },
  slider5TextLower: {
    width: width - 95,
    lineHeight: 22,
    marginTop: 10,
    fontFamily: Theme.FONT_REGULAR
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
  moreAndCancelSection: {
    width: width - 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 10
  },
  subMoreDetails: {
    fontFamily: Theme.FONT_BOLD,
    color: "#25B999",
    fontSize: 15
  },
  subCancelScription: {
    fontFamily: Theme.FONT_BOLD,
    color: "white",
    fontSize: 15,
    marginRight: 3
  },
  dollarSign: {
    resizeMode: 'cover',
    alignSelf: 'center',
    marginRight: 3,
    marginLeft: 3
  },
  calendarIcon: {
    width: 17,
    height: 19
  }
});

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  null
)(PricingScreen);
