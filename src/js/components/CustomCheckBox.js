import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TickGreen from '../icons/TickGreen';
import { Theme } from '../constants/constants'

class CustomCheckBox extends Component {
  constructor() {
    super();
    this.state = { checked: null }
  }

  componentWillMount() {
    if (this.props.checked) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
  }

  toggleState() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    const { onClickCustomCheckbox } = this.props;
    return (
      <TouchableHighlight
        onPress={() => {
          onClickCustomCheckbox();
          this.toggleState();
        }}
        underlayColor="transparent" style={styles.checkBoxButton}>
        <View style={styles.checkBoxHolder}>
          <View style={{
            width: this.props.size, height: this.props.size, backgroundColor: this.props.color, padding: 0, borderRadius: 4, overflow: 'hidden'
          }}>
            {
              (this.state.checked)
                ?
                (<View style={styles.checkedView}>
                  <TickGreen style={styles.checkedImage} />
                </View>)
                :
                (<View style={styles.uncheckedView} />)
            }
          </View>
          <Text style={[styles.checkBoxLabel, { color: this.props.color }]}>
            {this.props.label}
          </Text>

        </View>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'stretch',
    fontSize: 12
  },
  checkBoxButton: {
    marginVertical: 10
  },
  checkBoxHolder: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  checkedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkedImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  uncheckedView: {
    flex: 1,
    backgroundColor: '#5C5C5C'
  },
  checkBoxLabel: {
    fontSize: 14,
    marginTop: -3,
    paddingLeft: 13,
    fontFamily: Theme.FONT_MEDIUM
  }
});

CustomCheckBox.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  label: PropTypes.object,
  checked: PropTypes.bool
}

CustomCheckBox.defaultProps = {
  size: 25,
  color: '#5C5C5C',
  flexWrap: 'nowrap',
  label: 'Default Label',
  checked: false,
}

export default CustomCheckBox;