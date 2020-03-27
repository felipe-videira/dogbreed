import React, { useEffect, useReducer, useMemo, useState } from 'react';
import { registerRootComponent, AppLoading } from 'expo';

import { StatusBar, Image } from 'react-native';
import Routes from './routes';

import './i18n';
import { Asset } from 'expo-asset';
import * as auth from "./services/auth";
import { authReducer, AUTH_TYPES } from "./reducers/authReducer";
import { AuthProvider } from "./providers/authProvider";


function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  const [authState, authDispatch] = useReducer(authReducer, {
    loading: true,
    token: null,
  });

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        await auth.onSignIn(data);
        authDispatch({ type: AUTH_TYPES.SIGN_IN, data });
      },
      signOut: async () => {
        await auth.onSignOut();
        authDispatch({ type: AUTH_TYPES.SIGN_OUT });
      }
    }),
    []
  );

  const cacheImages = images => {
    return Promise.all(images.map(image => {
      return typeof image === 'string'
        ? Image.prefetch(image)
        : Asset.fromModule(image).downloadAsync()
    }))
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      let restoredToken;

      try {
        const [ token ] = await Promise.all([
          auth.getToken(),
          cacheImages([
            require('../assets/images/notfound.png')
          ])
        ]);

        restoredToken = token;

        setAppIsReady(true);

      } catch (e) {
        console.log(e)
      }

      authDispatch({
        type: AUTH_TYPES.RESTORE_TOKEN,
        data: restoredToken
      });
    };

    bootstrapAsync();
  }, []);

  return !appIsReady || authState.loading ? (
    <AppLoading />
  ) : (
    <AuthProvider value={authContext}>
      <StatusBar barStyle="ligth-content" />
      <Routes signed={!!authState.token} />
    </AuthProvider>
  );
}

export default registerRootComponent(App);
