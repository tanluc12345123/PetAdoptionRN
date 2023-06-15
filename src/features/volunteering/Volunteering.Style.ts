import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { Fonts } from '../../assets/fonts/index';

export const VolunteeringStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: Colors.silver,
    marginBottom: 40,
    borderRadius: 15,
    marginHorizontal: 18,
    elevation: 20,
  },
  imageItem: {
    width: 130,
    height: 150,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15
  },
  containerContent: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  numberPeople: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 10,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: 10,
    color: Colors.darker
  },
  dateOfEvent: {
    alignSelf: 'flex-end',
    marginTop: 10,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: 12,
    color: Colors.darker
  },
});
