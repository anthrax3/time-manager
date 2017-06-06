// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchList: ['list'],
  fetchLogs: ['userId', 'period'],
  setCurrent: ['current', 'dates'],
  setStatus: ['status', 'weekId', 'userId'],
  setStatusSuccess: ['logs'],
  fetchListSuccess: ['list'],
  fetchLogsSuccess: ['logs'],
  fetchFailure: ['error'],
})

export const EmployeeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: null,
  current: null,
  dates: null,
  logs: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to fetch employee list
export const request = (state: Object) =>
  state.merge({ fetching: true })

// fetch was a success
export const success = (state: Object, { list, logs }: Object) =>
  state.merge({ fetching: false, error: null, list, logs })

// fetch was a fail
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

export const current = (state: Object, { current, dates }: Object) =>
  state.merge({ current, dates })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CURRENT]: current,
  [Types.SET_STATUS]: request,
  [Types.FETCH_LIST]: request,
  [Types.FETCH_LOGS]: request,
  [Types.SET_STATUS_SUCCESS]: success,
  [Types.FETCH_LIST_SUCCESS]: success,
  [Types.FETCH_LOGS_SUCCESS]: success,
  [Types.FETCH_FAILURE]: failure
})

