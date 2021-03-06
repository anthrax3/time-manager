// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackHandler, View } from 'react-native'
import styles from './Styles/DrawerContentStyle'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

class DrawerContent extends Component {

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  viewDirectory = () => {
    this.toggleDrawer()
    NavigationActions.employeeDirectory()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.drawerBranding}>
          <Image source={Images.logo} style={styles.logo} />
        </View>
        <DrawerButton text='Employee Directory' onPress={this.viewDirectory} />
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
