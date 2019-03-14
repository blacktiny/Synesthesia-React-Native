import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Theme } from "../constants/constants";
import Carousel from "../components/Carousel";
const slider1 = require("../../assets/Slider/slider_1.png");
const slider2 = require("../../assets/Slider/slider_2.png");
const slider3 = require("../../assets/Slider/slider_3.png");
const slider4 = require("../../assets/Slider/slider_4.png");
const slider5 = require("../../assets/Slider/slider_5.png");
const { width, height } = Dimensions.get("screen");


export default CarouselSlider = () => (
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
)


const styles = StyleSheet.create({

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
});
