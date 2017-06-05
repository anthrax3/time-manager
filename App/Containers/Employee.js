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
import Colors from '../Themes/Colors'
import RoundedButton from '../Components/RoundedButton'
import TimeLogs from '../Components/TimeLogs'
// external libs
// import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import {Gravatar} from 'react-native-gravatar'

// import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/EmployeeStyle'

class Employee extends Component {

  constructor (props) {
    super(props);
    const curDate = new Date()
    let dates = {
      weekNum: Moment(curDate).week(),
      startDate: Moment(curDate, 'YYYYMMDD').startOf('week'),
      endDate: Moment(curDate, 'YYYYMMDD').endOf('week')
    };
    this.state = {
      ...dates,
      viewing: this.viewingFormat(dates.startDate, dates.endDate)
    };
    this.confirmDate = this.confirmDate.bind(this)
    this.openCalendar = this.openCalendar.bind(this)
  }

  viewingFormat(startMoment, endMoment){
    const dateFormat = 'YYYY-MM-DD'
    return `${startMoment.format(dateFormat)} / ${endMoment.format(dateFormat)}`
  }

  // Update states when new week selection is confirmed
  confirmDate({startDate, endDate, startMoment, endMoment}) {
    this.setState({
      startDate,
      endDate,
      weekNum: startMoment.week(),
      viewing: this.viewingFormat(startMoment, endMoment)
    });
  }

  openCalendar() {
    this.calendar && this.calendar.open()
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
              parameters: { size: 200 },
              secure: true
            }} style={styles.avatar} />
            <View>
              <Text style={styles.username}>{employee.username}</Text>
              <Text style={styles.email} onPress={() => this.handleOpenEmail(employee.email)}>{employee.email}</Text>
            </View>
          </View>
          <TimeLogs currentWeek={this.state.weekNum} userId={employee.id}/>
          <Text style={styles.viewingHeader}>Currently Viewing</Text>
          <Text style={styles.viewing}>{this.state.viewing}</Text>
          <RoundedButton onPress={this.openCalendar}>
            Select Week
          </RoundedButton>
          <Calendar
            i18n='en'
            ref={calendar => {this.calendar = calendar}}
            color={{subColor: Colors.brandHighlight, mainColor: Colors.drawer}}
            format='YYYYMMDD'
            startDate={this.state.startDate}
            minDate='20170101'
            maxDate='20171230'
            endDate={this.state.endDate}
            onConfirm={this.confirmDate}
            rangeConstraint='week'
          />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

Employee.defaultProps = {

};

const mapStateToProps = state => {
  return {
    employee: state.employee.current
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee)
