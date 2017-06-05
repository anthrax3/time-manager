// @flow

import React, {Component} from 'react'
import { View, Text, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Calendar from 'react-native-calendar-select'
import Moment from 'moment'
import EmployeeActions from '../Redux/EmployeeRedux'

import AlertMessage from '../Components/AlertMessage'
import RoundedButton from '../Components/RoundedButton'
import Colors from '../Themes/Colors'

// Styles
import styles from './Styles/TimeLogsStyle'

type TimeLogsProps = {
  dispatch: () => any,
  fetching: boolean,
  fetchLogs: () => void,
  logs: object,
  month: number,
  year: number,
  userId: string,
  weekNum: number,
  viewMode: string // 'month' || 'week'
}

class TimeLogs extends Component {
  props: TimeLogsProps

  state: {
    logs: object
  }

  constructor (props: TimeLogsProps) {
    super(props)

    this.confirmDate = this.confirmDate.bind(this)
    this.openCalendar = this.openCalendar.bind(this)
  }

  componentWillMount() {
    let dataObjects = []
    const curDate = new Date()
    const dates = {
      weekNum: Moment(curDate).week(),
      startDate: Moment(curDate, 'YYYYMMDD').startOf('week'),
      endDate: Moment(curDate, 'YYYYMMDD').endOf('week')
    };

    // Teach dataSource how to detect if rows are different.
    const rowHasChanged = (r1, r2) => r1.id !== r2.id

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    let period = [
      dates.startDate.month(),
      dates.startDate.year()
    ];

    this.props.dispatch(EmployeeActions.fetchLogs(this.props.userId, period))

    this.state = {
      ...dates,
      viewing: this.viewingFormat(dates.startDate, dates.endDate),
      logs: ds.cloneWithRows(dataObjects)
    };
  }

  componentWillReceiveProps ({fetching, logs}) {
    // Did the fetch complete?
    if (!fetching && logs.data) {
      this.setState({
        logs: this.state.logs.cloneWithRows(logs.data.weeks)
      })
    }
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

  renderWeek (week, section, index) {
    return (
      <TouchableOpacity style={styles.row}>
        <Week data={week} weekIndex={index} />
      </TouchableOpacity>
    )
  }

  // Used for friendly AlertMessage
  // returns true if the logs is empty
  noRowData () {
    return (!this.state.fetching && this.state.logs.getRowCount() === 0)
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage title={`No data found for ${this.state.viewing}`} show={this.noRowData()} />
        <Text style={styles.viewingHeader}>Currently Viewing</Text>
        <Text style={styles.viewing}>{this.state.viewing}</Text>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.logs}
          renderRow={this.renderWeek.bind(this)}
          pageSize={4}
          enableEmptySections
        />
        <RoundedButton onPress={this.openCalendar}>Select Week</RoundedButton>
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
      </View>
    )
  }
}

/**
 * Week class displays the week and its days
 * @todo abstract to own file
 */
class Week extends Component {

  constructor (props) {
    super(props)
  }

  componentWillMount() {
    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
    // Datasource is always in state
    this.state = {
      days: ds.cloneWithRows(this.props.data.days_in_week)
    }
  }

  renderDay (day, sec, i) {
    return (
      //@todo add note modal on touch
      <TouchableOpacity style={styles.day}>
      <Day data={day} dayIndex={i}/>
        <View>
          <Text style={styles.boldLabel}>{day.hours} hours, {day.minutes} minutes</Text>
        </View>
      </TouchableOpacity>
    )
  }

  // Used for friendly AlertMessage
  // returns true if the logs is empty
  noRowData () {
    return this.state.days.getRowCount() === 0
  }

  weekStyle(status) {
    const weekStatusStyles = {
      approved: styles.weekApproved,
      rejected: styles.weekRejected,
      pending: styles.weekPending
    };
    return weekStatusStyles[status] || weekStatusStyles['pending']
  }

  render () {
    return (
      <View style={this.weekStyle[this.props.data.status]}>
        <AlertMessage title='No data available for this week!' show={this.noRowData()} />
        <Text>Total Time: </Text>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.days}
          renderRow={this.renderDay.bind(this)}
          pageSize={7}
        />
      </View>
    )
  }
}


/**
 * Week class displays the week and its days
 * @todo abstract to own file
 */
class Day extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={styles.dayCell}>
        <Text style={styles.weekday}>{Moment().day(this.props.dayIndex).format('dddd')}</Text>
        <Text style={styles.dayLog}>{this.props.data.log}</Text>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.employee.fetching,
    logs: state.employee.logs
  }
}

export default connect(mapStateToProps)(TimeLogs)
