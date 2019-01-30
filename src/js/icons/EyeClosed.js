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

const EyeClosed = props => (
  <Svg width={25} height={12} {...props}>
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
      d="M329.534 557.118c.053.052.101.11.143.176l1.602 2.5a1 1 0 0 1-1.684 1.079l-1.602-2.5-.028-.046a8.711 8.711 0 0 1-3.465 1.256V562a1 1 0 1 1-2 0v-2.362a8.69 8.69 0 0 1-3.35-.95l-1.399 2.185a1 1 0 1 1-1.684-1.08l1.415-2.206c-.784-.64-1.517-1.425-2.2-2.354l-2.168 1.437a1 1 0 1 1-1.105-1.667l2.185-1.448c-.18-.314-.357-.64-.53-.978a1 1 0 1 1 1.783-.908c2.065 4.054 4.644 5.998 7.793 5.998 3.148 0 5.727-1.944 7.793-5.998a1 1 0 1 1 1.782.908c-.117.23-.236.453-.356.671a1 1 0 0 1 .248.12l2.468 1.635a1 1 0 1 1-1.105 1.667l-2.468-1.635a1.004 1.004 0 0 1-.165-.137 13.731 13.731 0 0 1-1.903 2.22z"
      transform="translate(-311 -551)"
      fill="url(#prefix__a)"
      fillRule="evenodd"
    />
  </Svg>
)

export default EyeClosed
