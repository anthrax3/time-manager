import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
import { EmployeeTypes } from '../Redux/EmployeeRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { openScreen } from './OpenScreenSagas'
import { fetchList, setCurrent } from './EmployeeSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),
    takeLatest(EmployeeTypes.FETCH_LIST, fetchList, API),
    takeLatest(EmployeeTypes.SET_CURRENT, setCurrent)

    // some sagas receive extra parameters in addition to an action
    // takeLatest(TemperatureTypes.TEMPERATURE_REQUEST, getTemperature, api)
  ]
}
