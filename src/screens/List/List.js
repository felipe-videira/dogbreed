import React, { useEffect, useState } from 'react';

import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Image } from 'react-native-elements';
import Header from '../../components/Header';

import { breedApi } from '../../api';
import useAuth from '../../hooks/useAuth';
import { BREEDS } from '../../constants';

import styles from './styles';


export default function List({ navigation }) {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

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

      const items = await breedApi.list(breed);

      setItems(items);
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
      <Header onLogout={logout} />
      <SafeAreaView style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onPhotoPressed(item)}
                style={styles.listItem}
              >
                <Image
                  source={{ uri: item }}
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
