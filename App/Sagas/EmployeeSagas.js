import { call, put } from 'redux-saga/effects'
import EmployeeActions from '../Redux/EmployeeRedux'

// attempts to fetch list of employees
export function * fetchList (api, {type}) {
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
