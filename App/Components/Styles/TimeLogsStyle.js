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
    marginVertical: 1,
    padding: 5,
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  daysList: {
    width: '100%'
  },
  listContent: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flex: 1
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
