// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  day: {
    borderWidth: 0.5,
    borderColor: Colors.coal
  },
  viewingHeader: {
    ...Fonts.style.h5,
    textAlign: 'center',
    color: Colors.snow
  },
  viewing: {
    ...Fonts.style.description,
    color: Colors.snow,
    padding: Metrics.smallMargin,
    textAlign: 'center'
  },
})
