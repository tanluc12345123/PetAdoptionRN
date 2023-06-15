import { StyleSheet } from 'react-native';
import { Colors, Styles } from '../../theme';
import { Fonts } from '../../assets/fonts/index';

export const EnterPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter
  },
  bgLogin: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40
  },
  titleLogin: {
    flexDirection: 'column'
  },
  titleHello: {
    fontFamily: Fonts.ROBOTO_BOLD,
    fontSize: 20
  }
});
