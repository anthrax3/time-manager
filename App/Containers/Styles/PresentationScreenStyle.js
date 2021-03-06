// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  homeContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  homeBranding: {
    marginTop: 50
  },
  section: {
    margin: Metrics.section,
    padding: Metrics.baseMargin
  },
})
