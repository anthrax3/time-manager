import { call, put } from 'redux-saga/effects'
import EmployeeActions from '../Redux/EmployeeRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

// attempts to fetch list of employees
export function * fetchList (api, {type}) {
  // make the call to the api
  const users = yield call(api.users, type);

  if (users) {
    // dispatch failure
    yield put(EmployeeActions.fetchListSuccess(users))
  } else {
    // dispatch employee list
    yield put(EmployeeActions.fetchFailure('WRONG'))
  }
}

export function * fetchLogs (api, {userId, period}) {
  // make the call to the api
  const logs = yield call(api.logs, userId, period);
  if (logs) {
    // dispatch failure
    yield put(EmployeeActions.fetchLogsSuccess(logs))
  } else {
    // dispatch employee list
    yield put(EmployeeActions.fetchFailure('WRONG'))
  }
}

export function * setStatus (api, {status, userId}) {
  // make the call to the api
  const updatedLogs = yield call(api.setStatus, status, userId);
  if (updatedLogs) {
    // dispatch failure
    yield put(EmployeeActions.setStatusSuccess(updatedLogs))
  } else {
    // dispatch employee list
    yield put(EmployeeActions.fetchFailure('WRONG'))
  }
}

// attempts to set current employee
export function * setCurrent ({current}) {
  if (current) {
    yield call(NavigationActions.employeeDetail)
  }
}
