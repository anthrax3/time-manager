// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import EmployeeDirectory from '../Containers/EmployeeDirectory'
import Employee from '../Containers/Employee'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='presentationScreen' component={PresentationScreen} title='Aurity Management'/>
            <Scene key='employeeDirectory' component={EmployeeDirectory} title='Employee Directory'/>
            <Scene key='employeeDetail' component={Employee} title='Employee Detail' passProps/>
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
