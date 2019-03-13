import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { LinearTextGradient } from 'react-native-text-gradient';
import LinearGradient from 'react-native-linear-gradient';

import InputTextField from '../components/InputTextField';
import SuccessModal from '../components/SuccessModal';

import { Theme } from '../constants/constants';

import ModalCloseIcon from '../icons/ModalCloseIcon';

import { closeSuccessModal } from '../actions/ToggleFormModalAction';
import {
  setModalType,
  openPaymentDetailsModal
} from '../actions/ToggleFormModalAction';
import { setSubscriptionType } from '../actions/SubscriptionAction';

const credit_card_icon = require('../../assets/credit-card.png');
const paypal_mark = require('../../assets/paypal_mark.png');

const { width, height } = Dimensions.get('screen');

class ConfirmMonthlySubscribeScreen extends Component {
  constructor() {
    super();

    this.state = {
      toggleType: true,
      holderName: '',
      nameError: '',
      nameSuccessBorder: false,
      nameErrorBorder: false,
      cardNumber: '',
      numberError: '',
      numberSuccessBorder: false,
      numberErrorBorder: false,
      endDate: '',
      endDateError: '',
      endDateSuccessBorder: false,
      endDateErrorBorder: false,
      CVVNumber: '',
      cvvError: '',
      cvvSuccessBorder: false,
      cvvErrorBorder: false,
      modalType: '7-dayTrial'
    };
  }

  validateName = name => {
    let error = '';
    if (name.trim() === '') {
      error = 'Must not be blank';
      this.setState({
        nameErrorBorder: true,
        nameSuccessBorder: false
      });
    } else {
      this.setState({
        nameErrorBorder: false,
        nameSuccessBorder: true
      });
    }
    this.setState({
      nameError: error
    });
  };

  validateCardNumber = number => {
    let error = '';
    if (number.trim() === '') {
      error = 'Must not be blank';
      this.setState({
        numberErrorBorder: true,
        numberSuccessBorder: false
      });
    } else {
      this.setState({
        numberErrorBorder: false,
        numberSuccessBorder: true
      });
    }
    this.setState({
      numberError: error
    });
  };

  validateEndDate = date => {
    let error = '';
    if (date.trim() === '') {
      error = 'Must not be blank';
      this.setState({
        endDateErrorBorder: true,
        endDateSuccessBorder: false
      });
    } else {
      this.setState({
        endDateErrorBorder: false,
        endDateSuccessBorder: true
      });
    }
    this.setState({
      endDateError: error
    });
  };

  validateCVVNumber = number => {
    let error = '';
    if (number.trim() === '') {
      error = 'Must not be blank';
      this.setState({
        cvvErrorBorder: true,
        cvvSuccessBorder: false
      });
    } else {
      this.setState({
        cvvErrorBorder: false,
        cvvSuccessBorder: true
      });
    }
    this.setState({
      cvvError: error
    });
  };

  onToggleBtnClicked = bToggle => {
    const { toggleType } = this.state;
    if (toggleType != bToggle) {
      this.setState({ toggleType: bToggle });
    }
  };

  onCancelBtnClicked = () => {};

  onYesBtnClicked = () => {};

  render() {
    const { toggleType, modalType } = this.state;
    const {
      navigation,
      isSuccessModalVisible,
      chosenSubscription
    } = this.props;
    const tier = navigation.getParam('tier');

    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <ScrollView style={styles.main} scrollEnabled={true}>
          <Text style={styles.trial}>{'7-day trial'}</Text>
          {tier == 'monthly' && (
            <LinearTextGradient
              style={styles.subscription}
              locations={[0, 1]}
              colors={['#AEA2F2', '#725BEE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: '#917FF0' }}>{'Monthly subscription'}</Text>
            </LinearTextGradient>
          )}
          {tier == 'yearly' && (
            <LinearTextGradient
              style={styles.subscription}
              locations={[0, 1]}
              colors={['#0060EB', '#006CED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: '#006CED' }}>{'Yearly subscription'}</Text>
            </LinearTextGradient>
          )}
          <Text style={styles.billToday}>
            {'Total bill today '} <Text style={{ fontSize: 22 }}>{'0$'}</Text>
          </Text>
          <Text
            style={{
              fontFamily: Theme.FONT_REGULAR,
              color: '#717171',
              fontSize: 16,
              lineHeight: 24
            }}
          >
            {'If you do not cancel within 7 days, you will be charged '}
            {tier === 'monthly' ? 'monthly ' : 'yearly '}
            <Text style={{ color: 'white' }}>
              ${tier === 'monthly' ? '4.99' : '35.88'}
            </Text>
            {'. You can cancel anytime.'}
            <Text
              onPress={() => {
                this.props.dispatch(openPaymentDetailsModal());
              }}
              style={{ color: '#25B999' }}
            >
              {' More Payment Details'}
            </Text>
          </Text>

          {/* <Text style={styles.paySecurely}>
            {'Pay securely'}
          </Text>
          <View style={{ height: 50, marginTop: 5, marginBottom: 10, width: '100%', flexDirection: 'row' }}>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={toggleType ? ['#6F58ED', '#AEA2F2'] : ['#ffffff', '#ffffff']}
              style={[styles.toggleBtnBack, { borderTopLeftRadius: 27.5, borderBottomLeftRadius: 27.5 }]}
            >
              <TouchableHighlight style={[styles.toggleButton, { width: toggleType ? (width - 30) / 2 - 4 : (width - 30) / 2, borderTopLeftRadius: 27.5, borderBottomLeftRadius: 27.5, marginRight: toggleType ? 2 : 0 }]} onPress={() => this.onToggleBtnClicked(true)} underlayColor={'#2e2e2f'}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Image source={credit_card_icon} />
                  <Text style={{ fontFamily: Theme.FONT_SEMIBOLD, fontSize: 15, color: 'white' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Credit card</Text>
                </View>
              </TouchableHighlight>
            </LinearGradient>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={toggleType ? ['#ffffff', '#ffffff'] : ['#AEA2F2', '#6F58ED']}
              style={[styles.toggleBtnBack, { borderTopRightRadius: 27.5, borderBottomRightRadius: 27.5 }]}
            >
              <TouchableHighlight style={[styles.toggleButton, { width: toggleType ? (width - 30) / 2 : (width - 30) / 2 - 4, borderTopRightRadius: 27.5, borderBottomRightRadius: 27.5, marginLeft: toggleType ? 0 : 2 }]} onPress={() => this.onToggleBtnClicked(false)} underlayColor={'#2e2e2f'}>
                <Image source={paypal_mark} />
              </TouchableHighlight>
            </LinearGradient>
          </View> */}

          {/* <View style={styles.cardSection}>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={['#3D3D3E', '#505052']}
              style={styles.cardBackground}
            >
              <Text style={styles.label}>{'Card holder name'}</Text>
              <InputTextField
                onChange={(value) => {
                  this.setState({
                    holderName: value.trim()
                  })
                }}
                value={this.state.holderName}
                onBlur={() => this.validateName(this.state.holderName)}
                error={this.state.nameError}
                showSuccessBorder={this.state.nameSuccessBorder}
                showErrorBorder={this.state.nameErrorBorder}
              />

              <View style={{height: 20}} />
              <Text style={styles.label}>{'Card number'}</Text>
              <InputTextField
                onChange={(value) => {
                  this.setState({
                    cardNumber: value.trim()
                  })
                }}
                value={this.state.cardNumber}
                onBlur={() => this.validateCardNumber(this.state.cardNumber)}
                error={this.state.numberError}
                showSuccessBorder={this.state.numberSuccessBorder}
                showErrorBorder={this.state.numberErrorBorder}
              />

              <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: '40%', flexDirection: 'column'}}>
                  <Text style={styles.label}>{'End date'}</Text>
                  <InputTextField
                    onChange={(value) => {
                      this.setState({
                        endDate: value.trim()
                      })
                    }}
                    value={this.state.endDate}
                    onBlur={() => this.validateEndDate(this.state.endDate)}
                    error={this.state.endDateError}
                    showSuccessBorder={this.state.endDateSuccessBorder}
                    showErrorBorder={this.state.endDateErrorBorder}
                  />
                </View>
                <View style={{width: '40%', flexDirection: 'column'}}>
                  <Text style={styles.label}>{'CVV'}</Text>
                  <InputTextField
                    onChange={(value) => {
                      this.setState({
                        CVVNumber: value.trim()
                      })
                    }}
                    value={this.state.CVVNumber}
                    onBlur={() => this.validateCVVNumber(this.state.CVVNumber)}
                    error={this.state.cvvError}
                    showSuccessBorder={this.state.cvvSuccessBorder}
                    showErrorBorder={this.state.cvvErrorBorder}
                  />
                </View>
              </View>
            </LinearGradient>
          </View> */}

          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={[styles.modalButton, styles.nothanksButton]}
              onPress={() => this.props.navigation.navigate('User')}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <ModalCloseIcon color='white' strokeWidth={1} />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#FFFFFF',
                    fontFamily: Theme.FONT_SEMIBOLD
                  }}
                >
                  &nbsp;&nbsp;&nbsp;{'Cancel'}
                </Text>
              </View>
            </TouchableOpacity>

            {tier == 'monthly' && (
              <TouchableOpacity
                style={[styles.modalButton, styles.subscribeButton]}
                onPress={() => {
                  this.props.dispatch(setModalType('7-dayTrial'));
                  this.props.dispatch(setSubscriptionType('monthly'));
                  this.props.navigation.navigate('User');
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: '#FFFFFF',
                    fontFamily: Theme.FONT_BOLD
                  }}
                >
                  {'7-day trial'}
                </Text>
              </TouchableOpacity>
            )}

            {tier == 'yearly' && (
              <TouchableOpacity
                style={[styles.modalButton, styles.subscribeButton]}
                onPress={() => {
                  this.props.dispatch(setModalType('7-dayTrial'));
                  this.props.dispatch(setSubscriptionType('yearly'));
                  this.props.navigation.navigate('User');
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: '#FFFFFF',
                    fontFamily: Theme.FONT_BOLD
                  }}
                >
                  {'Get 7 days free'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ width: '100%', height: 150 }} />
        </ScrollView>

        {/* { chosenSubscription !== '' && <SuccessModal
          modalVisible={isSuccessModalVisible}
          modalType={modalType}
          closeModal={() => { this.props.dispatch(closeSuccessModal()); this.props.navigation.navigate('User') }}
        /> } */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1F1F20',
    padding: 15
  },
  trial: {
    width: '100%',
    fontFamily: Theme.FONT_BOLD,
    fontSize: 30,
    color: 'white',
    paddingBottom: 10
  },
  subscription: {
    fontFamily: Theme.FONT_SEMIBOLD,
    fontSize: 22,
    paddingTop: 5,
    paddingBottom: 20
  },
  billToday: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 18,
    color: 'white',
    paddingTop: 5,
    paddingBottom: 20
  },
  paySecurely: {
    fontFamily: Theme.FONT_SEMIBOLD,
    fontSize: 18,
    color: 'white',
    marginTop: 30,
    marginBottom: 10
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
  toggleButton: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F20',
    margin: 2
  },
  cardSection: {
    borderRadius: 12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 20 },
    shadowColor: 'black',
    shadowOpacity: 0.47,
    elevation: 20,
    marginTop: 5,
    marginBottom: 5
  },
  cardBackground: {
    width: width - 30,
    padding: 18,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'column',
    borderRadius: 12
  },
  label: {
    fontFamily: Theme.FONT_MEDIUM,
    fontSize: 16,
    color: '#717171'
  },
  textEdit: {
    fontFamily: Theme.FONT_MEDIUM,
    fontSize: 18,
    color: 'white'
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  subscribeButton: {
    width: '48%',
    backgroundColor: '#25B999',
    borderWidth: 0
  },
  nothanksButton: {
    width: '48%'
  }
});

function mapStateToProps(state) {
  return {
    isSuccessModalVisible: state.toggleFormModalReducer.isSuccessModalVisible,
    chosenSubscription: state.subscriptionReducer.chosenSubscription
  };
}

export default connect(
  mapStateToProps,
  null
)(ConfirmMonthlySubscribeScreen);
