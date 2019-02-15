import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AsyncStorage, Text, View, ScrollView, ImageBackground, ActivityIndicator, Image, TouchableOpacity, FlatList } from 'react-native';
import BottomBar from '../components/BottomBar';
import ActivityDependentExercise from '../components/ActivityDependentExercise';

import { getSynesthesia } from '../actions/SynesthesiaAction'

const hearing = require('../../assets/hearing.png')
import { Theme } from '../constants/constants'
import { FILES_URL } from '../constants/constants'
import ProgressiveImage from '../components//ProgressiveImage';

class Synesthesia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLockedBannerVisible: false
    }
  }

  componentDidMount() {
    // const { isLoggedIn } = this.props;

    // if (isLoggedIn) {
    this.props.dispatch(getSynesthesia());
    // }
  }

  onItemButtonClicked = (id) => {
    AsyncStorage.setItem('nodeID', id);
    this.props.navigation.navigate('SynesthesiaItem');
  }

  loadingPage = () => {
    return (
      <View style={{ height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    )
  }

  renderData = (synesthesiaDatas) => {
    const { isFetchingData } = this.props;
    if (synesthesiaDatas && !isFetchingData) {
      let arrData = [];
      synesthesiaDatas.map((data) => {
        let property = [];
        if (data.type != "leaf") {
          const header = data.header;
          const subHeader = data.subheader;
          const imageBanner = FILES_URL + data.image_banner;
          var number = 1;
          data.children.map((item) => {
            property.push({
              id: item.id,
              number: number,
              icon: FILES_URL + item.image_square,
              type: item.type,
              name: item.display_name,
              is_done: item.is_done,
              is_free: item.is_free,
              is_locked: item.is_locked,
              is_published: item.is_published
            });
            number++;
          })
          arrData.push(this.renderContainers(data.id, header, subHeader, imageBanner, property));
        }
      });
      return arrData;
    }
  }

  renderContainers = (key, header, subHeader, imageBanner, data) => {
    return (
      <View key={key} >

        {imageBanner.includes("null") ?
          <View style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 20 }}>
            <Text style={{ fontSize: 19, color: '#FFFFFF', fontFamily: Theme.FONT_BOLD }}>{header}</Text>
            <Text style={{ fontSize: 14, color: '#FFFFFF', marginTop: 5, fontFamily: Theme.FONT_MEDIUM }}>{subHeader}</Text>
          </View>
          :
          <View style={{ marginTop: -30 }}>
            <ProgressiveImage
              thumbnailSource={{ uri: imageBanner }}
              source={{ uri: imageBanner }}
              style={{ width: '100%', height: 137 }}
              resizeMode="cover"
              isImageBanner={true}
            />
            <Text style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#FFFFFF',
              position: 'absolute',
              top: 40,
              left: 0,
              right: 0,
              fontFamily: Theme.FONT_BOLD
            }}>{header}</Text>
            <Text style={{
              textAlign: 'center',
              fontSize: 14,
              paddingTop: 8,
              color: '#FFFFFF',
              position: 'absolute',
              top: 60,
              left: 0,
              right: 0,
              paddingLeft: 30,
              paddingRight: 30,
              fontFamily: Theme.FONT_MEDIUM
            }}>{subHeader}</Text>
          </View>
        }

        <View style={{ flex: 1, paddingLeft: 2 }}>
          <FlatList
            data={data}
            contentContainerStyle={{ justifyContent: 'space-between', flexDirection: 'row' }}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={({ item, index }) => this.renderContainerItem(item.id, item, index, data.length)}
            extraData={data}
          />
        </View>
        <View style={{ height: 1, color: 'rgba(9,9,9, 0.26)', width: '100%', borderColor: 'rgba(9,9,9, 0.26)', borderWidth: 1, marginTop: 15, marginBottom: 15 }} />
      </View >
    )
  }

  renderContainerItem = (id, item, index, itemList) => {
    return (
      <View>
        {
          item.type == "leaf" ?
            <ActivityDependentExercise
              id={id}
              index={index}
              numberCount={itemList}
              item={item}
              onPress={() => this.onLeafClicked(item)}
            />
            :
            <View style={{ width: 110, alignItems: 'center', marginTop: 20, marginRight: 10, marginLeft: 20, marginBottom: 20 }}>
              <TouchableOpacity onPress={() => { this.onItemButtonClicked(id) }}>
                <View>
                  {item.icon.includes("null") ?
                    <Image
                      source={hearing}
                      style={{ width: 130, height: 130, resizeMode: 'contain' }}
                    />
                    :
                    <ProgressiveImage
                      thumbnailSource={{ uri: item.icon }}
                      source={{ uri: item.icon }}
                      style={{ width: 120, height: 120, borderRadius: 12 }}
                      resizeMode="cover"
                    />
                  }
                </View>
              </TouchableOpacity>
              <View style={{ marginTop: 8, marginLeft: 0, width: 120 }}>
                <Text style={{ fontSize: 14, color: '#FFFFFF' }}>
                  {item.name}
                </Text>
              </View>
            </View>
        }
      </View>

    )
  }

  onLeafClicked = (item) => {
    if (item.is_locked > 0) {
      this.setState({ isLockedBannerVisible: true });
    } else {
      this.props.navigation.navigate('Player')
    }
  }

  render() {
    const { isFetchingData, synesthesiaData } = this.props;
    const header = synesthesiaData.header;
    const subHeader = synesthesiaData.subheader;
    const imageBanner = FILES_URL + synesthesiaData.image_banner;
    const synesthesiaDatas = synesthesiaData.children;
    return (
      <View style={{ flex: 1, backgroundColor: '#1F1F20' }}>
        <BottomBar screen={'syensthesia'} navigation={this.props.navigation} />
        <ScrollView style={{ flexGrow: 1, marginBottom: 35 }}>
          {!isFetchingData &&
            <View>
              <ProgressiveImage
                thumbnailSource={{ uri: imageBanner }}
                source={{ uri: imageBanner }}
                style={{ width: '100%', height: 137 }}
                resizeMode="cover"
                isImageBanner={true}
              />
              <Text style={{
                textAlign: 'center',
                fontSize: 20,
                color: '#FFFFFF',
                position: 'absolute',
                top: 40,
                left: 0,
                right: 0,
                fontFamily: Theme.FONT_BOLD
              }}>{header}</Text>
              <Text style={{
                textAlign: 'center',
                fontSize: 14,
                paddingTop: 8,
                color: '#FFFFFF',
                position: 'absolute',
                top: 60,
                left: 0,
                right: 0,
                paddingLeft: 30,
                paddingRight: 30,
                fontFamily: Theme.FONT_MEDIUM
              }}>{subHeader}</Text>
            </View>}


          {isFetchingData && this.loadingPage()}
          {this.renderData(synesthesiaDatas)}
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.synesthesiaReducer.error,
    isFetchingData: state.synesthesiaReducer.isFetchingData,
    synesthesiaData: state.synesthesiaReducer.synesthesiaData
  }
}

export default connect(mapStateToProps)(Synesthesia);