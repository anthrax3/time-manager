// @flow

import React, { Component } from 'react'
import { ScrollView, Text, Button, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import Calendar from 'react-native-calendar-select'
import EmployeeActions from '../Redux/EmployeeRedux'
import Colors from '../Themes/Colors'
import RoundedButton from '../Components/RoundedButton'
// external libs
// import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
// import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/EmployeeStyle'

const getSunday = d => {
  let day = d.getDay()
  let diff = d.getDate() - day + (day == 0 ? -7:1);
  return new Date(d.setDate(diff));
}

const getSaturday = d => {
  let day = d.getDay()
  let diff = d.getDate() - day + (day == 0 ? -1:1);
  return new Date(d.setDate(diff));
}

class Employee extends Component {

  constructor (props) {
    super(props);
    this.state = {
      startDate: getSunday(new Date()),
      endDate: getSaturday(new Date())
    };
    this.confirmDate = this.confirmDate.bind(this)
    this.openCalendar = this.openCalendar.bind(this)
  }

  // when confirm button is clicked, an object is conveyed to outer component
  // contains following property:
  // startDate [Date Object], endDate [Date Object]
  // startMoment [Moment Object], endMoment [Moment Object]
  confirmDate({startDate, endDate, startMoment, endMoment}) {
    this.setState({
      startDate,
      endDate
    });
  }

  openCalendar() {
    this.calendar && this.calendar.open()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>Employee Container</Text>
          <RoundedButton onPress={this.openCalendar}>
            Select Week
          </RoundedButton>
          <Calendar
            i18n='en'
            ref={calendar => {this.calendar = calendar}}
            color={{subColor: Colors.brandHighlight, mainColor: Colors.drawer}}
            format='YYYYMMDD'
            minDate='20170101'
            maxDate='20181230'
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onConfirm={this.confirmDate}
            rangeConstraint='week'
          />
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
