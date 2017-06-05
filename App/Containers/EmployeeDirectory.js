// @flow

import React, {Component} from 'react'
import { View, Text, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {Gravatar} from 'react-native-gravatar'
import EmployeeActions from '../Redux/EmployeeRedux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'
import LoadingIndicator from '../Components/LoadingIndicator'

// Styles
import styles from './Styles/EmployeeDirectoryStyle'

type EmployeeDirectoryProps = {
  dispatch: () => any,
  fetching: boolean,
  fetchList: () => void,
  setCurrent: () => void,
  employees: object
}

class EmployeeDirectory extends Component {
  props: EmployeeDirectoryProps

  state: {
    employees: object
  }

  constructor (props: EmployeeDirectoryProps) {
    super(props)

    let dataObjects = [];

    this.props.dispatch(EmployeeActions.fetchList())

    // Teach dataSource how to detect if rows are different.
    const rowHasChanged = (r1, r2) => r1.id !== r2.id

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      employees: ds.cloneWithRows(dataObjects),
      fetching: true
    }
  }

  componentWillReceiveProps ({fetching, employees}) {
    // Did the fetch complete?
    if (!fetching && employees) {
      this.setState({
        employees: this.state.employees.cloneWithRows(employees)
      })
    }
  }


  renderRow (rowData) {
    return (
      <TouchableOpacity style={styles.row} onPress={() => this.props.dispatch(EmployeeActions.setCurrent(rowData))}>
        <Gravatar options={{
          email: rowData.email,
          parameters: { d: 'mm' },
          secure: true}} style={styles.avatar} />
        <View>
          <Text style={styles.boldLabel}>{rowData.id}: {rowData.username}</Text>
          <Text style={styles.label}>{rowData.email}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  // Used for friendly AlertMessage
  // returns true if the employees is empty
  noRowData () {
    return (!this.state.fetching && this.state.employees.getRowCount() === 0)
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage title='No Employees found!' show={this.noRowData()} />
        <LoadingIndicator show={this.props.fetching} text='Loading Directory' />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.employees}
          renderRow={this.renderRow.bind(this)}
          pageSize={15}
          enableEmptySections
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.employee.fetching,
    current: state.employee.current,
    employees: state.employee.list
  }
}

export default connect(mapStateToProps)(EmployeeDirectory)
