// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  userDetails:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: Metrics.smallMargin,
    justifyContent: 'flex-start',
    marginBottom: Metrics.doubleBaseMargin
  },
  username: {
    ...Fonts.style.h4,
    color: Colors.brandHighlight
  },
  email: {
    color: Colors.frost
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 50
  }
})
