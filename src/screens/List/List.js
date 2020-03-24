import React, { useEffect, useState } from 'react';

import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native';
import { Image } from "react-native-expo-image-cache";
import Header from '../../components/Header';
import { breedApi } from '../../api';
import useAuth from '../../hooks/useAuth';
import RNPickerSelect from 'react-native-picker-select';

import styles from './styles';

import {
  BREEDS,
  BREEDS_LIST,
  IMAGES_PER_PAGE
} from '../../constants';


export default function List({ navigation }) {

  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMoreImages, setloadingMoreImages] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [imagesInDisplay, setImagesInDisplay] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(BREEDS.CHIHUAHUA);

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

      const images = await breedApi.list(breed);

      setPage(1);
      setNumberOfPages(Math.floor(images.length / IMAGES_PER_PAGE) +
        (images.length % IMAGES_PER_PAGE));
      setAllImages(images);
      setImagesInDisplay(images.slice(0, IMAGES_PER_PAGE));
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const loadMoreImages = () => {
    if (page === numberOfPages) return;
    try {
      setloadingMoreImages(true);

      setImagesInDisplay([
        ...imagesInDisplay,
        ...allImages.slice(IMAGES_PER_PAGE * page, IMAGES_PER_PAGE * (page + 1))
      ]);

      setPage(page + 1);
    } finally {
      setloadingMoreImages(false);
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

  const renderFooter = () => {
    return loadingMoreImages
      ? <ActivityIndicator color="black" />
      : null;
  }


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
              data={imagesInDisplay}
              renderItem={renderItem}
              keyExtractor={item => item}
              onEndReached={loadMoreImages}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
            />
          )}
    </View>
  );
}
