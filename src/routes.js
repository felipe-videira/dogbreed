import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './screens/Register/Register';
import ListScreen from './screens/List/List';
import PhotoScreen from './screens/Photo/Photo';

const Stack = createStackNavigator()


export default function Routes({ signed = false }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={signed ? 'List' : 'Register'}
        headerMode="none"
        gestureEnabled={false}
      >
        {signed ? (
          <>
            <Stack.Screen
              name="List"
              component={ListScreen}
              options={{
                headerShown: false,
                gestureEnabled: false
              }}
            />
            <Stack.Screen
              name="Photo"
              component={PhotoScreen}
              options={{
                headerTitle: null,
                headerTransparent: true,
                headerTintColor: '#f9f9f9'
              }}
            />
          </>
        ) : (
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
