import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';

import BannerCloseIcon from '../icons/BannerCloseIcon';

const { width, height } = Dimensions.get('screen');

class UserScreen extends Component {
  constructor() {
    super();
    // this.state = {};
  }

  componentDidUpdate() {
    const { navigation } = this.props;
  }

  loginSuccessBanner = () => {
    return (
      <LinearGradient
        start={{ x: 0.93, y: 0.14 }} end={{ x: 0, y: 1.0 }}
        locations={[0, 1]}
        colors={['#7059ED', '#00C2FB']}
        style={styles.loginBanner}>
        <TouchableOpacity style={styles.crossButton} onPress={() => {
          this.setState({
            email: '',
            password: '',
            emailSuccessBorder: false,
            passwordSuccessBorder: false,
          })

          if (this.props.isLoggedIn) this.props.navigation.navigate('Sensorium');
        }}>
          <BannerCloseIcon style={styles.crossIcon} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={{ color: '#FFFFFF', fontSize: 19 }}>{'Yeah! :)'}</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 14, marginTop: 10 }}>{'Login Successful!'}</Text>
        </View>
      </LinearGradient>
    )
  }


  render() {
    const {
      user,
      isLoggedIn,
      navigation
    } = this.props

    return (
      <View style={styles.main}>

        <View style={styles.container}>
          {isLoggedIn && this.loginSuccessBanner()}
        </View>

        <ScrollView style={styles.formContainer}>

          <Text>{user.email}</Text>
          <Text>{user.first_name}</Text>
          <Text>{user.last_name}</Text>
          <Text>{user.name}</Text>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: '#3d3d3e'
  },
  formContainer: {
    padding: 16
  },
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  loginBanner: {
    height: height - 685,
    width: width - 30,
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 1
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
    alignItems: 'center'
  },
  crossButton: {
    paddingRight: 8,
    paddingTop: 5
  },
})

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    user: state.loginReducer.user
  }
}

export default connect(
  mapStateToProps,
  null
)(UserScreen)
