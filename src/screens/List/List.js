import React, { useEffect, useState } from 'react';

import ImageList from './components/ImageList';
import useAuth from '../../hooks/useAuth';
import { breedApi } from '../../api';

import i18n from 'i18n-js';

import { BREEDS } from '../../constants';


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

  useEffect(() => {
    getBreedList(selectedBreed);
  }, []);

  return (
    <ImageList
      onLogout={logout}
      onValueChange={getBreedList}
      onItemPress={onPhotoPressed}
      value={selectedBreed}
      loading={loading}
      data={images}
      emptyListText={i18n.t('emptyListText')}
    />
  );
}
