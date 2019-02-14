import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
const { width, height } = Dimensions.get('screen');

class UserScreen extends Component {
  constructor() {
    super();
    // this.state = {};
  }

  render() {
    const {
      user
    } = this.props

    return (
      <View style={styles.main}>

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
    user: state.loginReducer.user
  }
}

export default connect(
  mapStateToProps,
  null
)(UserScreen)
