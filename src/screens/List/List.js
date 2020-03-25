import React, { useEffect, useState } from 'react';

import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Image } from "react-native-expo-image-cache";
import RNPickerSelect from 'react-native-picker-select';
import Header from '../../components/Header';

import useAuth from '../../hooks/useAuth';
import { breedApi } from '../../api';

import styles from './styles';

import { BREEDS, BREEDS_LIST } from '../../constants';


export default function List({ navigation }) {

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [
    selectedBreed,
    setSelectedBreed
  ] = useState(BREEDS.CHIHUAHUA);

  const { signOut } = useAuth();


  const logout = async () => {
    return signOut();
  }

  const onPhotoPressed = uri => {
    navigation.navigate('Photo', { uri })
  }

  const getBreedList = async breed => {
    if (loading || !breed) return;
    try {
      setLoading(true);
      setSelectedBreed(breed);
      setImages(await breedApi.list(breed));
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onPhotoPressed(item)}
      style={styles.listItem}
    >
      <Image uri={item} style={styles.listItemImage} />
    </TouchableOpacity>
  );

  useEffect(() => {
    getBreedList(selectedBreed);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        onLogout={logout}
        iconColor="white"
        backgroundColor="black"
      />
        <RNPickerSelect
            onValueChange={value => getBreedList(value)}
            items={BREEDS_LIST}
            value={selectedBreed}
            useNativeAndroidPickerStyle={false}
            disabled={loading}
        />
          {loading ? (
            <ActivityIndicator color="black" />
          ) : (
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={images}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
          )}
    </View>
  );
}
