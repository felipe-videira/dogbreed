import React, { useState } from 'react';

import { View, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import Header from '../../components/Header';

import styles from './styles';

// TODO: improve this
export default function Photo({ route, navigation }) {

  const [source] = useState({ uri: route.params.uri });

  goBack = () =>{
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Header onGoBack={goBack} />
      <View style={styles.photoContainer}>
        <Image
          source={source}
          style={styles.photo}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
    </View>
  );
}
