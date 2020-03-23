import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3e3e3e',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: Constants.statusBarHeight,
  },
  list: {
    backgroundColor: 'transparent',
    marginHorizontal: 5,
  },
  listItem: {
    marginVertical: 10
  },
  listItemImage: {
    width,
    height: height / 3
  }
});
