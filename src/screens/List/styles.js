import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
  },
  emptyListText: {
    fontSize: 20,
    alignSelf: 'center'
  },
  list: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  listContainer: {
    backgroundColor: 'transparent',
  },
  listItem: {
    marginVertical: 10
  },
  listItemImage: {
    width,
    height: height / 3
  }
});
