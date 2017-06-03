// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/EmployeeStyle'

export default class Employee extends Component {

  render () {
    return (
      <View style={styles.container}>
        <Text>User Component</Text>
      </View>
    )
  }
}

// // Prop type warnings
User.propTypes = {
  id: React.PropTypes.bool.isRequired
  username: React.PropTypes.bool.isRequired
  email: React.PropTypes.bool.isRequired
}
//
// // Defaults for props
// User.defaultProps = {
//   someSetting: false
// }
