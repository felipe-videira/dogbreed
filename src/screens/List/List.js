import React, { useEffect, useState } from 'react';

import { View, ActivityIndicator } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';

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
  }, [])

  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <Button
        type="clear"
        onPress={logout}
        icon={<Icon
          name="logout"
          size={20}
        />}
      />
      {items.map((item, index) => (
        <TouchableHighlight
          key={index}
          onPress={() => onPhotoPressed(item)}
        >
          <Card image={item} />
        </TouchableHighlight>
      ))}
    </View>
  );
}
