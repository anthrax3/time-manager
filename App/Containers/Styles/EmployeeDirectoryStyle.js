// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  avatar: {
    marginRight: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: 10,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'flex-start'
  },
  boldLabel: {
    fontWeight: 'bold',
    color: Colors.snow,
    textAlign: 'left',
    marginVertical: Metrics.smallMargin
  },
  label: {
    textAlign: 'left',
    color: Colors.snow,
    marginBottom: Metrics.smallMargin
  },
  listContent: {
    marginTop: Metrics.baseMargin
  }
})
