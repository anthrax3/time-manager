// @flow

import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  Button,
  KeyboardAvoidingView,
  View,
  Linking
} from 'react-native'
import { connect } from 'react-redux'
import Calendar from 'react-native-calendar-select'
import Moment from 'moment'
import EmployeeActions from '../Redux/EmployeeRedux'
import TimeLogs from '../Components/TimeLogs'
import Animatable from 'react-native-animatable'
import {Gravatar} from 'react-native-gravatar'

// Styles
import styles from './Styles/EmployeeStyle'

class Employee extends Component {

  constructor (props) {
    super(props);
  }

  handleOpenEmail(email) {
    let url = `mailto:${email}`
    return Linking.openURL(url)
    .catch(err => console.error('An error occurred', err))
  }

  render () {
    const employee = this.props.employee;
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.userDetails}>
            <Gravatar options={{
              email: employee.email,
              parameters: { size: 200, d: 'mm' },
              secure: true
            }} style={styles.avatar} />
            <View>
              <Text style={styles.username}>{employee.username}</Text>
              <Text style={styles.email} onPress={() => this.handleOpenEmail(employee.email)}>{employee.email}</Text>
            </View>
          </View>
          <TimeLogs userId={employee.id}/>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = state => {
  return {
    employee: state.employee.current
  }
}

export default connect(mapStateToProps)(Employee)
