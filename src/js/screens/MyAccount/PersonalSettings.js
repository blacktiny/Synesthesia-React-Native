import React, { Component } from 'react'
import PropTypes from "prop-types"
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView, TouchableHighlight, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from "react-native-linear-gradient";

import { Theme } from '../../constants/constants';
import ModalCloseIcon from '../../icons/ModalCloseIcon';

import InputTextField from '../../components/InputTextField';
import CustomCheckBox from '../../components/CustomCheckBox';

import { updateUser, updateUserForm } from '../../actions/LoginAction';

const mail_want = require('../../../assets/mail_want.png');

const { width, height } = Dimensions.get('screen');

class PersonalSettings extends Component {
  constructor() {
    super();
    this.state = {
      userId: 0,
      bEditView: false,
      bLoadingShow: false,
      editBtnPressStatus: false,
      deleteBtnPressStatus: false,
      userName: '',
      userNameError: '',
      userNameSuccessBorder: false,
      userNameErrorBorder: false,
      email: '',
      emailError: '',
      emailSuccessBorder: false,
      emailErrorBorder: false,
      confirmEmail: '',
      confirmEmailError: '',
      confirmEmailSuccessBorder: false,
      confirmEmailErrorBorder: false,
      isChecked: false
    }
  }

  componentDidMount() {
    this.initState();
  }

  initState() {
    const { user } = this.props;
    this.setState({ userId: user.id });
    this.setState({ userName: user.name });
    if (user.name != '')
      this.setState({ userNameSuccessBorder: true });
    this.setState({ email: user.email });
    this.setState({ confirmEmail: user.email });
    if (user.email != '') {
      this.setState({ emailSuccessBorder: true });
      this.setState({ confirmEmailSuccessBorder: true });
    }
  }

  onHideUnderlay(itemName) {
    if (itemName == 'delete') {
      this.setState({ deleteBtnPressStatus: false });
    } else if (itemName == 'edit') {
      this.setState({ editBtnPressStatus: false });
    }
  }

  onShowUnderlay(itemName) {
    if (itemName == 'delete') {
      this.setState({ deleteBtnPressStatus: true });
    } else if (itemName == 'edit') {
      this.setState({ editBtnPressStatus: true });
    }
  }

  onDeleteBtnClicked = () => {

  }

  onEditBtnClicked = () => {
    const { onHideAndShowToggleBtn } = this.props;

    this.setState({ bEditView: true });
    onHideAndShowToggleBtn(false);
  }

  onCancelBtnClicked = () => {
    const { onHideAndShowToggleBtn } = this.props;

    this.setState({ bEditView: false });

    this.setState({ userNameSuccessBorder: false });
    this.setState({ userNameErrorBorder: false });
    this.setState({ emailSuccessBorder: false });
    this.setState({ emailErrorBorder: false });
    this.setState({ confirmEmailSuccessBorder: false });
    this.setState({ confirmEmailErrorBorder: false });

    this.initState();

    onHideAndShowToggleBtn(true);
  }

  onSaveBtnClicked = () => {
    const user = {
      "id": this.state.userId,
      "name": this.state.userName,
      "email": this.state.email,
      "first_name": "",
      "last_name": "",
      "confirmEmail": this.state.confirmEmail
    }
    this.setState({ bLoadingShow: true });
    this.props.dispatch(updateUser(user));
    this.props.dispatch(updateUserForm());
    this.setState({ bEditView: false, bLoadingShow: false });
  }

  validateUserName = (userName) => {
    let error = '';
    if (userName.trim() === '') {
      error = 'Must not be blank';
      this.setState({
        userNameErrorBorder: true,
        userNameSuccessBorder: false
      })
    } else {
      this.setState({
        userNameErrorBorder: false,
        userNameSuccessBorder: true
      })
    }
    this.setState({
      userNameError: error
    })
  }

  validateEmailRegex = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  validateEmail = (email) => {
    let error = '';
    if (email.trim() === '') {
      error = 'Must not be blank';
      this.setState({
        emailErrorBorder: true,
        emailSuccessBorder: false
      })
    } else if (email) {
      if (!this.validateEmailRegex(email)) {
        error = 'Please enter valid email';
        this.setState({
          emailErrorBorder: true,
          emailSuccessBorder: false
        })
      } else {
        this.setState({
          emailErrorBorder: false,
          emailSuccessBorder: true
        })
      }
    }

    if (this.state.confirmEmail !== email) {
      error = "Emails don't match!";
      this.setState({
        emailErrorBorder: true,
        emailSuccessBorder: false
      })
    }

    this.setState({
      emailError: error
    })
  }

  validateConfirmEmail = (confirmEmail) => {
    let error = '';
    if (confirmEmail.trim() === '') {
      error = 'Must not be blank';
      this.setState({
        confirmEmailErrorBorder: true,
        confirmEmailSuccessBorder: false
      })
    } else {
      this.setState({
        confirmEmailErrorBorder: false,
        confirmEmailSuccessBorder: true
      })
    }

    if (this.state.email !== confirmEmail) {
      error = "Emails don't match!";
      this.setState({
        confirmEmailErrorBorder: true,
        confirmEmailSuccessBorder: false
      })
    }

    this.setState({
      confirmEmailError: error
    })
  }

  loadingPage = () => {
    return (
      <View style={{ height: height - 455, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    )
  }

  render() {
    const { requestPending, modalType } = this.props;
    const { bLoadingShow, userName, email, confirmEmail, bEditView, editBtnPressStatus, deleteBtnPressStatus } = this.state;
    const saveInfoDisabled = this.state.emailSuccessBorder && this.state.confirmEmailSuccessBorder;
    return (
      <View style={styles.main}>
        <ScrollView style={styles.formContainer}>
          {!bLoadingShow && !requestPending && !bEditView && <View>
            <Text style={{ fontFamily: Theme.FONT_SEMIBOLD, fontSize: 22, marginTop: 15, marginBottom: 15, color: 'white' }}>Personal information</Text>
            <View style={styles.personalInfo}>
              <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                colors={["#3D3D3E", "#505052"]}
                style={styles.personalInfoBack}
              >
                <View style={{ marginBottom: 20 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.label}>Username</Text>
                    <TouchableHighlight onPress={() => this.onEditBtnClicked()} onHideUnderlay={() => this.onHideUnderlay('edit')} onShowUnderlay={() => this.onShowUnderlay('edit')} underlayColor={'transparent'}>
                      <Text style={{ fontFamily: Theme.FONT_SEMIBOLD, fontSize: 16, color: '#30CA9A', opacity: editBtnPressStatus ? 0.7 : 1.0 }}>Edit</Text>
                    </TouchableHighlight>
                  </View>
                  <Text style={styles.textEdit}>{userName}</Text>
                </View>
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.textEdit}>{email}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={{
                      height: 20,
                      width: 20
                    }}
                    resizeMode='contain'
                    source={mail_want}
                  />
                  <Text style={{ fontFamily: Theme.FONT_MEDIUM, fontSize: 16, color: 'white', marginLeft: 15 }}>I  want  to  receive  emails</Text>
                </View>
              </LinearGradient>
            </View>
            <TouchableHighlight style={{ flexDirection: 'row', marginTop: 25, marginBottom: 10 }} onPress={() => this.onDeleteBtnClicked()} onHideUnderlay={() => this.onHideUnderlay('delete')} onShowUnderlay={() => this.onShowUnderlay('delete')} underlayColor={'transparent'}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <ModalCloseIcon style={{ opacity: deleteBtnPressStatus ? 0.7 : 1.0 }} color="#30CA9A" />
                <Text style={{ fontFamily: Theme.FONT_BOLD, fontSize: 16, color: '#30CA9A', opacity: deleteBtnPressStatus ? 0.7 : 1.0, marginLeft: 15 }}>{'Delete account'}</Text>
              </View>
            </TouchableHighlight>
          </View>}
          {!bLoadingShow && !requestPending && bEditView && <View style={{ height: height + 150 }}>
            <Text style={{ fontFamily: Theme.FONT_SEMIBOLD, fontSize: 22, marginTop: 15, marginBottom: 15, color: 'white' }}>Edit personal information</Text>
            <View style={styles.personalInfo}>
              <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                colors={["#3D3D3E", "#505052"]}
                style={styles.personalInfoBack}
              >
                <Text style={styles.label}>{'Username'}</Text>
                <InputTextField
                  onChange={(value) => {
                    this.setState({
                      userName: value.trim()
                    })
                  }}
                  value={this.state.userName}
                  onBlur={() => this.validateUserName(this.state.userName)}
                  error={this.state.userNameError}
                  showSuccessBorder={this.state.userNameSuccessBorder}
                  showErrorBorder={this.state.userNameErrorBorder}
                />
                <View style={{ paddingTop: 10 }} />
                <Text style={styles.label}>{'Email'}</Text>
                <InputTextField
                  onChange={(value) => {
                    this.setState({
                      email: value.trim()
                    })
                    this.validateEmail(value)
                  }}
                  value={this.state.email}
                  onBlur={() => this.validateEmail(this.state.email)}
                  error={this.state.emailError}
                  showSuccessBorder={this.state.emailSuccessBorder}
                  showErrorBorder={this.state.emailErrorBorder}
                />
                <View style={{ paddingTop: 10 }} />
                <Text style={styles.label}>{'Confirm Email'}</Text>
                <InputTextField
                  onChange={(value) => {
                    this.setState({
                      confirmEmail: value.trim()
                    })
                    this.validateConfirmEmail(value)
                  }}
                  value={this.state.confirmEmail}
                  onBlur={() => this.validateConfirmEmail(this.state.confirmEmail)}
                  error={this.state.confirmEmailError}
                  showSuccessBorder={this.state.confirmEmailSuccessBorder}
                  showErrorBorder={this.state.confirmEmailErrorBorder}
                />
                <View style={{ paddingTop: 10 }} />
                <CustomCheckBox
                  size={24}
                  checked={this.state.isChecked}
                  onClickCustomCheckbox={() => {
                    this.setState({
                      isChecked: !this.state.isChecked
                    })
                  }}
                  label={<Text>
                    <Text style={styles.checkBoxText}>{'I  want  to  receive  informative  emails  on '}</Text>
                    <Text style={styles.checkBoxText}>{'Synesthesia  and  Meditation'}</Text>
                  </Text>}
                />
              </LinearGradient>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableHighlight style={styles.editViewCancelBtn} onPress={() => this.onCancelBtnClicked()} underlayColor={"#ffffff12"}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <ModalCloseIcon color="white" />
                  <Text style={{ fontFamily: Theme.FONT_BOLD, fontSize: 16, color: 'white', marginLeft: 15 }}>{'Cancel'}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight disabled={!saveInfoDisabled} style={styles.editViewSaveBtn} onPress={() => this.onSaveBtnClicked()} underlayColor={"#25b999cc"}>
                <Text style={{ fontFamily: Theme.FONT_BOLD, fontSize: 16, color: 'white' }}>{'Save Info'}</Text>
              </TouchableHighlight>
            </View>
          </View>}
          {requestPending && this.loadingPage()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1F1F20'
  },
  formContainer: {
    // padding: 15
  },
  toggleBtnBack: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggleButton: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F20',
    margin: 2
  },
  personalInfo: {
    borderRadius: 12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 20 },
    shadowColor: "black",
    shadowOpacity: 0.47,
    elevation: 20
  },
  personalInfoBack: {
    width: width - 30,
    padding: 18,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'column',
    borderRadius: 12
  },
  label: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 16,
    color: '#717171',
    marginBottom: 10
  },
  textEdit: {
    fontFamily: Theme.FONT_REGULAR,
    fontSize: 18,
    color: 'white'
  },
  checkBoxText: {
    color: '#777778',
    fontSize: 14
  },
  editViewCancelBtn: {
    height: 50,
    width: (width - 30) / 2 - 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 27.5,
    marginTop: 25,
    marginRight: 5
  },
  editViewSaveBtn: {
    height: 50,
    width: (width - 30) / 2 - 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#30CA9A',
    borderRadius: 27.5,
    marginTop: 25,
    marginLeft: 5
  },
  crossButton: {
    paddingRight: 8,
    paddingTop: 5
  },
  crossIcon: {
    alignSelf: 'flex-end',
    marginRight: -12,
    marginTop: 10,
    resizeMode: 'contain'
  },
  textContainer: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  },
  updateBanner: {
    height: height - 685,
    width: width - 30,
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 1
  }
})

function mapStateToProps(state) {
  return {
    user: state.loginReducer.user,
    requestPending: state.loginReducer.requestPending,
    modalType: state.toggleFormModalReducer.modalType
  }
}

PersonalSettings.propTypes = {
  onHideAndShowToggleBtn: PropTypes.func
};

export default connect(
  mapStateToProps,
  null
)(PersonalSettings)
