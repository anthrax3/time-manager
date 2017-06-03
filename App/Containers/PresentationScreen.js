// @flow

import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/PresentationScreenStyle'

export default class PresentationScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <View style={[styles.container, styles.homeContainer]}>
          <View style={[styles.centered, styles.homeBranding]}>
            <Image source={Images.clearLogo} style={styles.logo} />
            <Text style={styles.sectionText} >
              Company Management App
            </Text>
          </View>

          <View style={styles.section} >
            <RoundedButton onPress={NavigationActions.employeeDirectory}>
              Employee Directory
            </RoundedButton>
          </View>

          <View style={styles.centered}>
            <Text style={styles.subtitle}>For internal use only</Text>
          </View>

        </View>
      </View>
    )
  }
}
