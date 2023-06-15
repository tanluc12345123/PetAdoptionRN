import { StyleSheet } from 'react-native';
import { Colors, Styles } from '../../theme';
import { Fonts } from '../../assets/fonts/index';

export const PetStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter
  },
  containerItemPet: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: Colors.silver,
    marginBottom: 40,
    marginHorizontal: 18,
    borderRadius: 15,
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
    flexWrap: 'wrap',
  },
  gender: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 10,
    fontFamily: Fonts.ROBOTO_REGULAR,
    color: Colors.darker
  },
  age: {
    alignSelf: 'flex-end',
    marginTop: 10,
    fontFamily: Fonts.ROBOTO_REGULAR,
    color: Colors.darker
  },
  containerTypePet: {
    flex: 1,
    elevation: 15,
    marginHorizontal: 19,
    marginVertical: 20,
    padding: 6,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
