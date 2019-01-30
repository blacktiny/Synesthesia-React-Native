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

const EyeOpened = props => (
  <Svg width={23} height={19} {...props}>
    <Defs>
      <LinearGradient
        x1="100%"
        y1="2.728%"
        x2="3.844%"
        y2="95.685%"
        id="prefix__a"
      >
        <Stop stopColor="#6F58ED" offset="0%" />
        <Stop stopColor="#AEA2F2" offset="100%" />
      </LinearGradient>
    </Defs>
    <G
      transform="translate(-314 -544)"
      fill="url(#prefix__a)"
      fillRule="evenodd"
    >
      <Path d="M325.254 560.181c3.92-.04 6.94-2.403 9.06-7.09-2.275-4.738-5.295-7.102-9.06-7.091-3.765.01-6.85 2.374-9.254 7.09 2.25 4.767 5.335 7.13 9.254 7.091zm.02 2c-4.783.048-8.525-2.818-11.083-8.237a2 2 0 0 1 .027-1.762c2.716-5.328 6.424-8.17 11.03-8.182 4.63-.013 8.288 2.85 10.869 8.225a2 2 0 0 1 .02 1.69c-2.419 5.345-6.09 8.218-10.863 8.266z" />
      <Path d="M325.2 555a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
    </G>
  </Svg>
)

export default EyeOpened
