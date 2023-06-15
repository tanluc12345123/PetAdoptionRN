import { StyleSheet } from 'react-native';
import { Fonts } from '../../assets/fonts/index';
import { Colors } from '../../theme';

export const ServiceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter
  },
  containerItemService: {
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
  },
  containerTypeService: {
    flex: 1,
    elevation: 15,
    marginHorizontal: 5,
    marginVertical: 20,
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
