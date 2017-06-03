// @flow

import { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Employee' with whatever your reducer is called :)
import EmployeeActions from '../Redux/EmployeeRedux'
// import { Metrics } from '../Themes'
// external libs
// import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
// import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
// import styles from './Styles/EmployeeStyle'

// I18n
// import I18n from 'react-native-i18n'

class Employee extends Component {

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>Employee Container</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee)
