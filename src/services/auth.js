import { AsyncStorage } from 'react-native';


export const TOKEN_KEY = "@dogbreed:token";


export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);

export const onSignIn = token => AsyncStorage.setItem(TOKEN_KEY, token);

export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const isSignedIn = async () => {
  return (await AsyncStorage.getItem(TOKEN_KEY)) !== null;
};

