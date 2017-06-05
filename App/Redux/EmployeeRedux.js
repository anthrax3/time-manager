// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchList: ['list'],
  fetchLogs: ['logs'],
  setCurrent: ['current', 'dates'],
  fetchSuccess: ['list'],
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
export const success = (state: Object, { list }: Object) =>
  state.merge({ fetching: false, error: null, list })

// fetch was a fail
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

export const current = (state: Object, { current, dates }: Object) =>
  state.merge({ current, dates })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CURRENT]: current,
  [Types.FETCH_LIST]: request,
  [Types.FETCH_LOGS]: request,
  [Types.FETCH_SUCCESS]: success,
  [Types.FETCH_FAILURE]: failure
})

