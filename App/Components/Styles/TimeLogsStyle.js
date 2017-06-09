// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.titlePadding
  },
  section: {
    width: '100%'
  },
  day: {
    borderWidth: 0.5,
    borderColor: Colors.coal,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    padding:5
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  week: {
    backgroundColor: Colors.frost,
    alignItems: 'center',
    marginVertical: Metrics.smallMargin,
    padding: 10
  },
  weekSummary: {
    padding: 10,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'center'
  },
  textLeft: {
    textAlign: 'left'
  },
  setStatus: {
    width: 140,
    height: 35
  },
  viewingHeader: {
    ...Fonts.style.h5,
    textAlign: 'center',
    color: Colors.snow
  },
  viewMode: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin
  },
  viewModeLabel: {
    color: Colors.frost,
    marginHorizontal: Metrics.section
  },
  viewing: {
    ...Fonts.style.description,
    color: Colors.snow,
    padding: Metrics.smallMargin,
    textAlign: 'center'
  }
})
