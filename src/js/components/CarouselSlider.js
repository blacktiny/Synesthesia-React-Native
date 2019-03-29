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
const slider2 = require("../../assets/Slider/slider_2.jpg");
const slider3 = require("../../assets/Slider/slider_3.jpg");
const slider4 = require("../../assets/Slider/slider_4.jpg");
const slider5 = require("../../assets/Slider/slider_5.jpg");
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
            Investment in your life quality
          </Text>
          <Text style={[styles.sliderText, styles.slider1TextLower]}>
            Feel less stress, more inner balance and find better sleep. Rewire your brain positively & make healthier decisions.
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.carousel_slider}>
        <ImageBackground style={styles.slider} source={slider2} borderRadius={12}>
          <View style={styles.overlay}>
            <Text style={[styles.sliderText, styles.slider2TextUpper]}>
              Re-activate, tune and blend your senses
            </Text>
            <Text style={[styles.sliderText, styles.slider2TextLower]}>
              Experience your surrounding with more sensory awareness. See more, hear more; perceive more of the beauty of this planet.
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.carousel_slider}>
        <ImageBackground style={styles.slider} source={slider3} borderRadius={12}>
          <View style={styles.overlay}>
            <Text style={[styles.sliderText, styles.slider3TextUpper]}>
              Meditation cultivates synesthesia
            </Text>
            <Text style={[styles.sliderText, styles.slider3TextLower]}>
              As you become more mindful of your senses, you may discover your synesthetic abilities to blend the senses.
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.carousel_slider}>
        <ImageBackground style={styles.slider} source={slider4} borderRadius={12}>
          <View style={styles.overlay}>
            <Text style={[styles.sliderText, styles.slider4TextUpper]}>
              Mindfulness, awareness & synesthesia
            </Text>
            <Text style={[styles.sliderText, styles.slider4TextLower]}>
              Synesthesia Meditation is a unique mix of traditional mindfulness, sensory nature awareness techniques, and synesthetic explorations.
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.carousel_slider}>
        <ImageBackground style={styles.slider} source={slider5} borderRadius={12}>
          <View style={styles.overlay}>
            <Text style={[styles.sliderText, styles.slider5TextUpper]}>
              Your sensory awareness space
            </Text>
            <Text style={[styles.sliderText, styles.slider5TextLower]}>
              Unique interactive and multimedia meditations to sharpen your senses. Customize background themes and length of your meditation experiences.
            </Text>
          </View>
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
    width: width - 65,
    marginTop: 30,
    fontFamily: Theme.FONT_BOLD
  },
  slider1TextLower: {
    width: width - 65,
    marginTop: 12,
    fontFamily: Theme.FONT_REGULAR
  },
  slider2TextUpper: {
    width: width - 65,
    lineHeight: 22,
    marginTop: 25,
    fontFamily: Theme.FONT_BOLD
  },
  slider2TextLower: {
    width: width - 65,
    lineHeight: 22,
    marginTop: 12,
    fontFamily: Theme.FONT_REGULAR
  },
  slider3TextUpper: {
    width: width - 65,
    lineHeight: 22,
    marginTop: 35,
    fontFamily: Theme.FONT_BOLD
  },
  slider3TextLower: {
    width: width - 65,
    lineHeight: 22,
    marginTop: 12,
    fontFamily: Theme.FONT_REGULAR
  },
  slider4TextUpper: {
    width: width - 65,
    lineHeight: 22,
    marginTop: 25,
    fontFamily: Theme.FONT_BOLD
  },
  slider4TextLower: {
    width: width - 65,
    lineHeight: 22,
    marginTop: 12,
    fontFamily: Theme.FONT_REGULAR
  },
  slider5TextUpper: {
    width: width - 65,
    lineHeight: 22,
    marginTop: 25,
    fontFamily: Theme.FONT_BOLD
  },
  slider5TextLower: {
    width: width - 65,
    lineHeight: 22,
    marginTop: 10,
    fontFamily: Theme.FONT_REGULAR
  },
  overlay: {
    backgroundColor: 'rgba(31,31,32,0.5)',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    alignItems: "center",
  }
});
