
import React from 'react';

import Image from '../../../components/Image';
import { TouchableOpacity } from 'react-native';
import { pure } from 'recompose';

import PropTypes from 'prop-types';

import styles from '../styles';


function ListItem ({ item, onPress }) {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={styles.listItem}
    >
      <Image
        uri={item}
        style={styles.listItemImage}
        showAltImageOnError={false}
      />
    </TouchableOpacity>
  );
}

ListItem.propTypes = {
  item: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default pure(ListItem);
