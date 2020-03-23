import styles from './styles';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

// TODO: improve this
export default function Photo({ route }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: route.params.uri }}
        style={styles.photo}
        PlaceholderContent={<ActivityIndicator />}
        resizeMode="contain"
      />
    </View>
  );
}
