// @flow

import React, {Component} from 'react'
import { View, Text, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'
import EmployeeActions from '../Redux/EmployeeRedux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

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
  currentWeek: number
}

class TimeLogs extends Component {
  props: TimeLogsProps

  state: {
    logs: object,
    selectedEmployee: object
  }

  constructor (props: TimeLogsProps) {
    super(props)

    const dataObjects = []

    this.props.dispatch(EmployeeActions.fetchLogs(props.userId))

    // Teach dataSource how to detect if rows are different.
    const rowHasChanged = (r1, r2) => r1.id !== r2.id

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      logs: ds.cloneWithRows(dataObjects)
    }
  }

  componentWillReceiveProps ({fetching, logs}) {
    // Did the fetch complete?
    if (!fetching && logs) {
      this.setState({
        logs: this.state.logs.weeks.cloneWithRows(logs.week)
      })
    }
  }

  viewingFormat(startMoment, endMoment){
    const dateFormat = 'YYYY-MM-DD'
    return `${startMoment.format(dateFormat)} / ${endMoment.format(dateFormat)}`
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
    return this.state.logs.weeks.getRowCount() === 0
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage title='No found for this month' show={this.noRowData()} />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.logs.weeks}
          renderRow={this.renderWeek.bind(this)}
          pageSize={4}
        />
      </View>
    )
  }
}

type WeekProps = {
  weekNum: number
}

/**
 * Week class displays the week and its days
 * @todo abstract to own file
 */
class Week extends TimeLogs {
  props: WeekProps

  constructor (props: WeekProps) {
    super(props)

    const days = this.state.logs[props.weekIndex].days_in_weeks

    // Teach dataSource how to detect different rows
    const rowHasChanged = (r1, r2) => r1.id !== r2.id

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      logs: ds.cloneWithRows(days)
    }
  }

  renderDay (day, sec, i) {
    const dayProps = {
      log: `${day.hours} hours, ${day.minutes} minutes`,
      weekday: Moment().day(i)
    }
    console.log('dayProps => ', dayProps);
    return (
      //@todo add note modal on touch
      <TouchableOpacity style={styles.day}>
      <Day />
        <View>
          <Text style={styles.boldLabel}>{day.hours} hours, {day.minutes} minutes</Text>
        </View>
      </TouchableOpacity>
    )
  }

  // Used for friendly AlertMessage
  // returns true if the logs is empty
  noRowData () {
    return this.state.logs.getRowCount() === 0
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
class Day extends TimeLogs {
  props: DayProps

  constructor (props: DayProps) {
    super(props)

    const days = this.state.logs[prop.weekId].days_in_weeks
  }

  render () {
    return (
      <View style={styles.dayCell}>
        <Text style={styles.weekday}>{this.props.weekday}</Text>
        <Text style={styles.dayLog}>{this.props.log}</Text>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.employee.fetching,
    week: state.employee.week,
    logs: state.employee.logs
  }
}

export default connect(mapStateToProps)(TimeLogs)
