import React, { Component } from 'react';
import {
   ActivityIndicator,
   View,
   StyleSheet,
   Text
} from 'react-native';
import Colors from '../Themes/Colors'

type LoadingIndicatorProps = {
  show?: bool,
  text: string
}

export default class LoadingIndicator extends Component {
  static defaultProps: {
    show: boolean,
    text: string
  }

  props: LoadingIndicatorProps

  render () {
    if (this.props.show) {
      const { text, show } = this.props
      return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={this.props.show}
          style={styles.activityIndicator}
          size="large"
          color={Colors.brandHighlight}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  return {
    show: state.employee.fetching
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  text: {
    color: Colors.snow
  }
});
