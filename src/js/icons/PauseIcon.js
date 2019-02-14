
import React from 'react';
import Svg, {
  Path
} from 'react-native-svg';

const PauseIcon = props => (
  <Svg width={16} height={23} fill="none">
    <Path fillRule="evenodd" clipRule="evenodd" d="M0 2.66667C0 1.19391 1.19391 0 2.66667 0V0C4.13943 0 5.33333 1.19391 5.33333 2.66667V20.3333C5.33333 21.8061 4.13943 23 2.66667 23V23C1.19391 23 0 21.8061 0 20.3333V2.66667Z" fill={ props.fill ? props.fill : "white" } />
    <Path fillRule="evenodd" clipRule="evenodd" d="M10.6667 2.66667C10.6667 1.19391 11.8606 0 13.3333 0V0C14.8061 0 16 1.19391 16 2.66667V20.3333C16 21.8061 14.8061 23 13.3333 23V23C11.8606 23 10.6667 21.8061 10.6667 20.3333V2.66667Z" fill={ props.fill ? props.fill : "white" } />
  </Svg>

)

export default PauseIcon

