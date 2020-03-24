import React, { useEffect, useState } from 'react';

import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Image } from "react-native-expo-image-cache";
import Header from '../../components/Header';
import { breedApi } from '../../api';
import useAuth from '../../hooks/useAuth';
import { BREEDS } from '../../constants';

import styles from './styles';


export default function List({ navigation }) {

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const { signOut } = useAuth()

  const logout = async () => {
    return signOut();
  }

  const onPhotoPressed = uri => {
    navigation.navigate('Photo', { uri })
  }

  const getBreedList = async (breed = BREEDS.CHIHUAHUA) => {
    try {
      setLoading(true);

      const images = await breedApi.list(breed);

      setImages(images);
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBreedList();
  }, []);

  return (
    <View style={styles.container}>
      <Header onLogout={logout} iconColor="black"/>
      <SafeAreaView style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator color="black" />
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onPhotoPressed(image)}
                style={styles.listItem}
              >
                <Image
                  uri={image}
                  style={styles.listItemImage}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
      )}
      </SafeAreaView>
    </View>
  );
}
