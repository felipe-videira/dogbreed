import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './screens/Register/Register';
import ListScreen from './screens/List/List';
import PhotoScreen from './screens/Photo/Photo';


export const SignedOutRoutes = createStackNavigator({
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false
    }
  },
},{
  initialRouteName: 'Register'
});

export const SignedInRoutes = createStackNavigator({
  List: {
    screen: ListScreen,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false
    }
  },
  Photo: {
    screen: PhotoScreen,
    navigationOptions: {
      headerTitle: null,
      headerTransparent: true,
      headerTintColor: '#f9f9f9'
    }
  },
}, {
  initialRouteName: 'List'
});

export const createRootNavigator = (signedIn = false) => {
  return createStackNavigator({
    SignedIn: { screen: SignedInRoutes },
    SignedOut: { screen: SignedOutRoutes }
  },
  {
    initialRouteName: signedIn ? "SignedIn" : "SignedOut",
  });
};

export default function Routes ({ signed }) {
  return createRootNavigator(signed);
}
