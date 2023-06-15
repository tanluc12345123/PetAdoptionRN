import { Styles } from '../../theme';
import { StyleSheet } from "react-native";
import { Fonts } from '../../assets/fonts/index';
import { Colors } from '../../theme';

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter
  },
  images: {
    width: 125,
    height: 110,
  },
  location: {
    textAlign: "center",
    marginVertical: 10,
    color: "black",
  },
  containerItem: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.silver,
    margin: 18,
    borderRadius: 15,
    elevation: 20,
  },
  imageItem: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  containerContent: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexWrap: 'wrap',
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: Colors.lighter,
  }
});
