import { call, put } from 'redux-saga/effects'
import EmployeeActions from '../Redux/EmployeeRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

// attempts to fetch list of employees
export function * fetchList (api, {type}) {
  console.log('type => ', type);
  // make the call to the api
  const users = yield call(api.users, type);

  if (users) {
    // dispatch failure
    yield put(EmployeeActions.fetchSuccess(users))
  } else {
    // dispatch employee list
    yield put(EmployeeActions.fetchFailure('WRONG'))
  }
}

export function * fetchLogs (api, {type}) {
  // make the call to the api
  const users = yield call(api.users, type);

  if (users) {
    // dispatch failure
    yield put(EmployeeActions.fetchSuccess(users))
  } else {
    // dispatch employee list
    yield put(EmployeeActions.fetchFailure('WRONG'))
  }
}

// attempts to set current employee
export function * setCurrent ({current}) {
  console.log('arguments => ', arguments);
  if (current) {
    // let dates = {
    //   weekNum: Moment(curDate).week(),
    //   startDate: Moment(curDate, 'YYYYMMDD').startOf('week'),
    //   endDate: Moment(curDate, 'YYYYMMDD').endOf('week'),
    //   viewing: `${this.state.startDate.toLocaleDateString()} / ${this.state.endDate.toLocaleDateString()}`
    // };

    yield call(NavigationActions.employeeDetail)
  }
}
