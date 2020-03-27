import React from 'react';

import ListItem from './ListItem';
import { View, ActivityIndicator, FlatList, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../../../components/Header';

import { BREEDS_LIST, BREEDS } from '../../../constants';

import PropTypes from 'prop-types';

import styles from '../styles';


function ImageList ({
  value,
  data,
  loading,
  emptyListText,
  onValueChange,
  onItemPress,
  onLogout,
}) {
  return (
    <View style={styles.container}>
      <Header
        onLogout={onLogout}
        iconColor="white"
        backgroundColor="black"
      />
      <RNPickerSelect
          onValueChange={onValueChange}
          items={BREEDS_LIST}
          value={value}
          disabled={loading}
      />
      {loading ? (
        <ActivityIndicator color="black" />
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={data}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              {emptyListText}
            </Text>
          )}
          renderItem={props => (
            <ListItem
              {...props}
              onPress={onItemPress}
            />
          )}
          keyExtractor={item => item}
        />
      )}
    </View>
  );
}


ImageList.propTypes = {
  value: PropTypes.oneOf(BREEDS_LIST.map(breed => breed.value)),
  data: PropTypes.array,
  loading: PropTypes.bool,
  emptyListText: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onItemPress: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

ImageList.defaultProps = {
  value: BREEDS.CHIHUAHUA,
  data: [],
  loading: false,
}

export default ImageList;
