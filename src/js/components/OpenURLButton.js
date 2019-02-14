class OpenURLButton extends React.Component {
  static propTypes = { url: React.PropTypes.string };
  handleClick = () => {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  };
  render() {
    return (
      <TouchableOpacity onPress={this.handleClick}>
        {" "}
        <View style={styles.button}>
          {" "}<Text style={styles.text}>Open {this.props.url}</Text>{" "}
        </View>
        {" "}
      </TouchableOpacity>
    );
  }
}