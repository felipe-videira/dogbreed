import React, { useEffect, useState } from 'react';

import { View, ActivityIndicator } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { MaterialCommunityIcons as Icon} from '@expo/vector-icons';

import request from '../../services/request';
import { onSignOut } from '../../services/auth';
import { BREEDS } from '../../constants';

import styles from './styles';
import { TouchableHighlight } from 'react-native-gesture-handler';


export default function List({ navigation }) {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const logout = async () => {
    await onSignOut();

    navigation.navigate('SignedOut');
  }

  const onPhotoPressed = uri => {
    navigation.navigate('Photo', { uri })
  }

  const getBreedList = async (breed = BREEDS.CHIHUAHUA) => {
    try {
      setLoading(true);

      const { list } = await request(`/list?breed=${breed}`);

      setItems(list);
    } catch (err) {
      console.log(err)
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
