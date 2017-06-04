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
    marginBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.frost,
    borderBottomWidth: 0.5
  },
  username: {
    ...Fonts.style.h4,
    color: Colors.brandHighlight
  },
  email: {
    color: Colors.frost
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
  avatar: {
    width: 150,
    height: 150,
    marginRight: 10
  }
})
