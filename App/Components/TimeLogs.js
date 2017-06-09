// @flow

import React, {Component} from 'react'
import {
  View,
  Text,
  ListView,
  TouchableOpacity,
  Picker
} from 'react-native'
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
      logs: ds.cloneWithRows(dataObjects),
      viewMode: this.props.viewMode
    }
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
      <Week data={week} weekIndex={index} userId={this.props.userId} viewMode={this.state.viewMode} />
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
        <RoundedButton onPress={this.openCalendar}>{this.state.viewing}</RoundedButton>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.logs}
          renderRow={this.renderWeek.bind(this)}
          pageSize={4}
          enableEmptySections
        />
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
    // @todo add hours and minutes
    let hours = this.props.data.days_in_week.map(day => day.hours)
    let status = this.props.data.status

    // Datasource is always in state
    this.setState({
      days: ds.cloneWithRows(this.props.data.days_in_week),
      totalTime: hours.reduce((a, b) => a + b),
      status
    })
  }

  renderDay(day, sec, i) {
    const date = Moment().week(this.props.data.week_number).day(day.day_number)
    return (
      <Day style={styles.day} data={day} date={date} dayIndex={i}/>
    )
  }

  // Used for friendly AlertMessage
  // returns true if the logs is empty
  noRowData() {
    return this.state.days.getRowCount() === 0
  }

  setStatus(status, userId){
    EmployeeActions.setStatus(status, this.props.data.week_id, userId)
    this.setState({status})
  }

  render() {
    let status = this.state.status || 'waiting'
    let dayList = null
    if (this.props.viewMode === 'week') {
      dayList = <ListView
          contentContainerStyle={[styles.listContent, styles.daysList]}
          dataSource={this.state.days}
          renderRow={this.renderDay.bind(this)}
          pageSize={7}
        />
    }
    return (
      <View style={[styles.row, styles.week]}>
        <AlertMessage title='No data available for this week!' show={this.noRowData()} />
        <View style={styles.weekSummary}>
          <Text style={styles.textLeft}>Week: {this.props.data.week_number}</Text>
          <Text style={styles.textLeft}>Total Time: {this.state.totalTime} hours</Text>
          <Picker
            style={styles.setStatus}
            selectedValue={status}
            onValueChange={status => this.setStatus(status, this.props.userId)}>
            <Picker.Item label="Approved" color={Colors.approved} value="approved" />
            <Picker.Item label="Rejected" color={Colors.rejected} value="rejected" />
            <Picker.Item label="Waiting" color={Colors.bloodOrange} value="waiting" />
          </Picker>
        </View>
        {dayList}
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
    const data = this.props.data;
    return (
      <View style={styles.day}>
        <Text>{this.props.date.format('dddd MMM Do, YYYY')}</Text>
        <Text>{data.hours} hours, {data.minutes} minutes</Text>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.employee.fetching,
    logs: state.employee.logs,
    viewMode: 'week'
  }
}

export default connect(mapStateToProps)(TimeLogs)
