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
  Stop,
  viewBox
} from 'react-native-svg';

const DollarSign = props => (
  <Svg width={props.width} height={props.height} viewBox={props.viewBox} {...props}>
    <Path
      d="M11.32 33.55H7.505v-4.165c-2.59-.245-5.075-.98-7.035-2.1V22.28c2.8 1.855 5.985 2.59 8.785 2.59 2.87 0 4.445-.595 4.445-2.345 0-4.585-13.09-2.17-13.09-10.85 0-4.13 2.94-6.335 6.895-6.86V.65h3.815v4.2c2.31.21 4.585.84 6.195 1.75v4.9c-2.065-1.47-4.83-2.205-7.56-2.17-2.66.035-3.99.77-3.99 2.275 0 4.235 13.125 1.96 13.125 10.675 0 4.865-3.43 6.79-7.77 7.14v4.13z"
      fill="#FFF"
      opacity={props.opacity ? props.opacity : 0.5}
    />
  </Svg>
)

export default DollarSign







