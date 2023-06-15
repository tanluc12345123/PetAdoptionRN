import { StyleSheet, Platform } from 'react-native';
import { Fonts } from '../assets/fonts';
import Colors from './Colors';

export const Styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.colorAliceBlueOpacity,
  },
  tabBarStyle: {
    display: 'flex',
    paddingTop: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: Colors.darker,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    height: Platform.OS === 'android' ? 74 : 100,
    elevation: 2,
  },
  containerIconBottom: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    padding: 9,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontFamily: Fonts.ROBOTO_BOLD,
    fontSize: 24
  },
  headerIconLeft: {
    width: 20,
    height: 25,
    position: 'absolute',
    paddingLeft: 10,
    paddingBottom: 10,
    left: 16,
  },
  headerIconRight: {
    width: 20,
    height: 25,
    position: 'absolute',
    paddingRight: 34,
    paddingBottom: 10,
    right: 16,
  },
  headerImageIcon: {
    width: 20,
    height: 20,
  }
});
