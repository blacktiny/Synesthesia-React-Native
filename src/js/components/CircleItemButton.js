import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, ImageBackground, Image, Text, View, StyleSheet } from 'react-native'
import { Theme } from '../constants/constants'

const tick = require('../../assets/tick.png')
const lock1 = require('../../assets/lock1.png')
const lock2 = require('../../assets/lock2.png')

class CircleItemButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      index: this.props.index,
      numberCount: this.props.numberCount,
      item: this.props.item
    };
  }

  render() {
    const { id, index, numberCount, item } = this.state;
    return (
      <View key={id} style={{ width: 90, alignItems: 'center', margin: 10 }}>
        <View style = {{flexDirection: 'row'}}>
          <TouchableOpacity style = {{width: 80, height: 80, borderRadius: 50, borderWidth: item.unviewed == "0" ? 3 : 0, backgroundColor: '#383938', borderColor: item.unviewed == "0" ? '#27BF9E' : '#383938', alignItems: 'center', justifyContent: 'center'}} onPress={() => console.log('test')}>
            <Text style = {{fontSize: 27, color: '#545260'}}>{item.number}</Text>
            {item.viewed == "1" && <Image style = {{height: 25, width: 25, alignSelf: 'flex-end', position: 'absolute', top: 53 }} source = {tick}/>}
            {item.locked == "1" && <ImageBackground style = {{height: 25, width: 25, alignSelf: 'flex-end', position: 'absolute', top: 53 }} source = {lock1}>
            <Image style = {{alignSelf: 'center', height: 33 ,width: 33, marginTop: 1}} resizeMode = 'contain' source = {lock2}/>
            </ImageBackground>}
          </TouchableOpacity>
          {index !== numberCount - 1 && <View style = {{width: 30, height: 5, backgroundColor: '#383938', alignSelf: 'center'}}/>}
          {index === numberCount - 1 && <View style = {{paddingRight: 27}}/>}
        </View>
        <View style={{ marginRight:  20 , width: 90 , marginTop: 10}}>
          <Text style={{ textAlign: 'center', fontSize: 14, color: !item.unviewed == "0" ? '#707070':'#FFFFFF' }}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  }
}

export default CircleItemButton;