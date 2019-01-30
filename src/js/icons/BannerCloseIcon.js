import React, { Component } from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  Use,
  Defs,
  Stop
} from 'react-native-svg';

const BannerCloseIcon = props => (
  <Svg width={19} height={19} {...props}>
    <G
      stroke="#AC9FF4"
      strokeWidth={3.8}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M16.552 2.852L2.859 16.148M2.86 2.852l13.692 13.296" />
    </G>
  </Svg>
)

export default BannerCloseIcon