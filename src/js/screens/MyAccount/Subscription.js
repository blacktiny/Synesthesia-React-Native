import React, { Component } from 'react'
import PropTypes from "prop-types";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Linking,
  Platform,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

import { Theme } from "../../constants/constants";

const { width, height } = Dimensions.get("screen");

import BannerCloseIcon from '../../icons/BannerCloseIcon';

const blueCalendarIcon = require("../../../assets/blue_calendar_icon.png");
const lilaCalendarIcon = require("../../../assets/lila_calendar_icon.png");
const cancelIcon = require("../../../assets/cancel_x.png");
import DollarSign from '../../icons/DollarSign';
import { openPaymentDetailsModal } from '../../actions/ToggleFormModalAction';

class Subscription extends Component {
  constructor() {
    super();

    this.state = {
      subscriptionDate: "06/12/2018",
      monthlyPrice: 4.99,
      yearlyPrice: 2.99,
      size: { width, height },
      addBtnPressStatus: false,
      editBtnPressStatus: false
    };
  }

  getFloat2String = price => {
    var strPrice = price.toString();
    strPrice = strPrice.replace(".", ",");
    return strPrice;
  };

  onHideUnderlay(itemName) {
    if (itemName == 'addCard') {
      this.setState({ addBtnPressStatus: false });
    } else if (itemName == 'editCard') {
      this.setState({ editBtnPressStatus: false });
    }
  }

  onShowUnderlay(itemName) {
    if (itemName == 'addCard') {
      this.setState({ addBtnPressStatus: true });
    } else if (itemName == 'editCard') {
      this.setState({ editBtnPressStatus: true });
    }
  }

  onSubscribeBtnClicked = () => {
    const { subscriptionType } = this.state;
    const { onSubscribeClicked } = this.props;

    onSubscribeClicked(subscriptionType);
  }

  onCancelSubScriptionClicked = () => {
    const { onUnsubscribeClicked } = this.props;

    // this.setState({ subscriptionType: 0 });
    onUnsubscribeClicked();
  };

  onEditBtnClicked = () => {
  }

  onAddBtnClicked = () => {
  }

  render() {
    const {
      subscriptionDate,
      // subscriptionType,
      monthlyPrice,
      yearlyPrice,
      addBtnPressStatus,
      editBtnPressStatus
    } = this.state;
    const strMonthlyPrice = this.getFloat2String(monthlyPrice);
    const strYearlyPrice = this.getFloat2String(yearlyPrice);

    const navigation = this.props.navigation;

    const { chosenSubscription } = this.props;
    // if (chosenSubscription == "monthly") {
    //   this.setState({ subscriptionType: 1 });
    // } else if (chosenSubscription == "yearly") {
    //   this.setState({ subscriptionType: 2 });
    // }

    const calendarIcon = chosenSubscription == "monthly" ? lilaCalendarIcon : blueCalendarIcon;

    let chooseSubscription = (
      <View>
        <Text style={styles.meditateFree}>{"All Synesthesia Meditations \n 7 days for free"}</Text>

        <View style={styles.btnSection}>
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#725BEE", "#725BEE", "#AEA2F2"]}
            style={styles.LinearGradient}
          >
            <TouchableOpacity
              style={[styles.btn, styles.btnMonthly, { alignItems: "center", }]}
              onPress={() => navigation.navigate('ConfirmMonthlySubscribe', { tier: 'monthly' })}
            >
              <Text style={styles.billType}>MONTHLY</Text>
              <View style={{
                flexDirection: 'row', flexWrap: 'wrap'
              }}>
                <DollarSign style={styles.dollarSign} width={20} height={34} viewBox={'0 0 20 34'} opacity={0.85} /><Text style={styles.price}>{strMonthlyPrice}</Text>
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
              onPress={() => navigation.navigate('ConfirmMonthlySubscribe', { tier: 'yearly' })}
            >
              <Text style={styles.billType}>YEARLY</Text>
              <View style={{
                flexDirection: 'row', flexWrap: 'wrap'
              }}>
                <DollarSign style={styles.dollarSign} width={20} height={34} viewBox={'0 0 20 34'} opacity={0.5} /><Text style={styles.price}>{strYearlyPrice}</Text>
              </View>
              <Text style={styles.perMonth}>per month</Text>
              <Text style={styles.billed}>*is billed yearly</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <Text style={styles.txtUpper}>
          Access all Meditations 7 days for free. {"\n"}
          <Text style={{ fontFamily: Theme.FONT_BOLD }}>If you do not like it, simply cancel.</Text>
        </Text>
        <Text style={styles.txtLower}>
          After 7 days your paid subscription starts automatically.
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 80 }}>
          <Text onPress={() => { this.props.dispatch(openPaymentDetailsModal()) }} style={styles.moreDetails}>More Payment Details </Text>
          <Text style={styles.moreDetailsAndWord}>and </Text>
          <Text onPress={() => { Linking.openURL('https://synesthesia.com/#/faq') }} style={styles.moreDetails}>FAQ</Text>
        </View>
      </View >
    );

    let currentSubscription = (
      <View>
        <Text style={styles.currentSubScpt}>Your current subscription</Text>

        <View style={styles.subBtnSection}>
          <LinearGradient
            colors={chosenSubscription == "monthly" ? ["#AEA2F2", "#9F90F1", "#907FF0", "#8370EF", "#725BEE"] : ["#00C2FB", "#00AAF7", "#0092F3", "#0078EF", "#0060EB"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.subGradient}
          >
            <TouchableOpacity style={styles.subBtnYear} onPress={() => this.onSubscribeBtnClicked()}>
              <View style={styles.subBillTypeSection}>
                <Text style={styles.subBillType}>{chosenSubscription == "monthly" ? 'MONTHLY' : 'YEARLY'}</Text>
              </View>
              <View style={styles.subPriceContent}>
                <View style={{
                  flexDirection: 'row', flexWrap: 'wrap', justifyContent: "flex-end"
                }}>
                  <DollarSign style={styles.dollarSign} width={15} height={22} viewBox={'0 0 20 34'} opacity={0.85} /><Text style={[styles.subPrice, { color: chosenSubscription == "monthly" ? '#917FF0' : '#0060EB' }]}>{chosenSubscription == "monthly" ? strMonthlyPrice : strYearlyPrice}</Text>
                </View>
                <Text style={styles.subPerMonth}>per month</Text>
                {chosenSubscription == "yearly" && <Text style={styles.subBilled}>*Billed Annually</Text>}
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.nextBillDate}>
          <Text style={styles.nextBillText}>Next billing date:</Text>
          <View style={styles.datePickerSection}>
            <Image style={styles.calendarIcon} source={calendarIcon} />

            {chosenSubscription == "monthly" ?
              <Text style={{ color: '#917FF0', paddingTop: 1, marginLeft: 8 }}>{subscriptionDate}</Text>
              :
              <Text style={{ color: '#0060EB', paddingTop: 1, marginLeft: 8 }}>{subscriptionDate}</Text>}
          </View>
        </View>

        <View style={styles.moreAndCancelSection}>
          <Text style={styles.subMoreDetails} onPress={() => this.props.dispatch(openPaymentDetailsModal())}>Payment Details</Text>
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

    let cardPanel = (
      <View style={styles.cardPanel}>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#3D3D3E", "#464648", "#505052"]}
          style={styles.cardPanelGradient}
        >
          <View>
            <View style={styles.circle}>
              <View style={styles.circleLeft}></View>
              <View style={styles.circleRight}></View>
            </View>
            <Text style={styles.cardText}>Card Number</Text>
            <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles.cardBoldText}>****&nbsp; ****&nbsp; ****&nbsp;</Text>
              <Text style={styles.cardNumberText}> 2355</Text>
            </View>
            <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.cardText}>Valid Thru</Text>
                <Text style={styles.cardDateText}>03/19</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.cardText}>CVV</Text>
                <Text style={[styles.cardBoldText, styles.cardCVVText]}>***</Text>
              </View>
            </View>
            <View style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <TouchableHighlight style={{ alignSelf: 'flex-end' }} onPress={() => this.onEditBtnClicked()} onHideUnderlay={() => this.onHideUnderlay('edit')} onShowUnderlay={() => this.onShowUnderlay('edit')} underlayColor={'transparent'}>
                <Text style={{ fontFamily: Theme.FONT_SEMIBOLD, fontSize: 16, color: '#30CA9A', opacity: editBtnPressStatus ? 0.7 : 1.0 }}>Edit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </LinearGradient>
      </View>
    );

    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <ScrollView
          style={styles.main}
          scrollEnabled={true}
        >
          {chosenSubscription != "monthly" && chosenSubscription != "yearly" && chooseSubscription}
          {(chosenSubscription == "monthly" || chosenSubscription == "yearly") && currentSubscription}
          {/* {subscriptionType > 0 && cardPanel}
          {subscriptionType > 0 && <TouchableHighlight style={{marginTop: 5}} onPress={() => this.onAddBtnClicked()} onHideUnderlay={() => this.onHideUnderlay('addCard')} onShowUnderlay={() => this.onShowUnderlay('addCard')} underlayColor={'transparent'}>
            <View style={{flexDirection: 'row', alignItems: 'center', display: 'flex'}} >
              <Text style={styles.plusSymbol}>+ </Text>
              <Text style={{ fontFamily: Theme.FONT_SEMIBOLD, fontSize: 16, color: '#30CA9A', opacity: addBtnPressStatus ? 0.7 : 1.0 }}>Add another card</Text>
            </View>
          </TouchableHighlight>} */}

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
    letterSpacing: 1.36
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
  price: {
    fontSize: 35,
    textAlign: "center",
    color: "white",
    paddingTop: 0,
    fontFamily: Theme.FONT_BOLD
  },
  subPrice: {
    fontFamily: Theme.FONT_BOLD,
    display: "flex",
    alignSelf: "flex-end",
    fontSize: 23,
    color: "#0096F4",
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
    color: "#0060EB",
    paddingTop: 3
  },
  nextBillDate: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 15
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
    marginLeft: 10,
    fontFamily: Theme.FONT_SEMIBOLD
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
  cardPanel: {
    borderRadius: 12,
    backgroundColor: '#979797',
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    elevation: 2,
    marginTop: 10
  },
  cardPanelGradient: {
    borderRadius: 12,
    padding: 20
  },
  circle: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end'
  },
  circleLeft: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    opacity: 0.5
  },
  circleRight: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    opacity: 0.5,
    marginLeft: -8
  },
  cardText: {
    fontFamily: Theme.FONT_MEDIUM,
    fontSize: 15,
    letterSpacing: 1.13,
    color: 'white',
    textTransform: 'uppercase',
    paddingTop: 2,
    paddingBottom: 2
  },
  cardNumberText: {
    fontFamily: Theme.FONT_MEDIUM,
    fontSize: 16,
    letterSpacing: 1.13,
    color: 'white'
  },
  cardDateText: {
    fontFamily: Theme.FONT_MEDIUM,
    fontSize: 16,
    letterSpacing: 1.13,
    color: 'white',
    paddingTop: 5
  },
  cardBoldText: {
    fontFamily: Theme.FONT_BOLD,
    fontSize: 24,
    letterSpacing: 1.13,
    color: 'white',
    paddingTop: 14
  },
  cardCVVText: {
    paddingTop: 5,
    marginBottom: -10
  },
  plusSymbol: {
    fontFamily: Theme.FONT_LIGHT,
    fontSize: 50,
    color: '#30CA9A',
    opacity: 0.7
  },
  description: {
    fontSize: 14,
    color: '#717171',
    lineHeight: 25,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: Theme.FONT_REGULAR
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

Subscription.propTypes = {
  onUnsubscribeClicked: PropTypes.func,
  onSubscribeClicked: PropTypes.func
};

function mapStateToProps(state) {
  return {
    chosenSubscription: state.subscriptionReducer.chosenSubscription,
  }
}

export default connect(mapStateToProps, null)(Subscription);
