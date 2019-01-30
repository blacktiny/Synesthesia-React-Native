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

const TickLila = props => (
  <Svg width={13} height={9} {...props}>
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
    <Path
      d="M334.287 371.3a1 1 0 1 1 1.426 1.4l-6.878 7a1 1 0 0 1-1.426 0l-4.122-4.194a1 1 0 1 1 1.426-1.402l3.409 3.47 6.165-6.275z"
      transform="translate(-323 -371)"
      fill="url(#prefix__a)"
      fillRule="evenodd"
    />
  </Svg>
)

export default TickLila
