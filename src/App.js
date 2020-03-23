import React, { useEffect, useReducer, useMemo } from 'react';
import { registerRootComponent } from 'expo';

import { StatusBar, ActivityIndicator } from 'react-native';
import Routes from './routes';

import * as auth from "./services/auth";
import { authReducer, AUTH_TYPES } from "./reducers/authReducer";
import { AuthProvider } from "./providers/authProvider";


function App() {

  const initialState =  {
    loading: true,
    token: null,
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        await auth.onSignIn(data);
        dispatch({ type: AUTH_TYPES.SIGN_IN, data });
      },
      signOut: async () => {
        await auth.onSignOut();
        dispatch({ type: AUTH_TYPES.SIGN_OUT });
      }
    }),
    []
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let data;
      try {
        data = await auth.getToken();
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: AUTH_TYPES.RESTORE_TOKEN, data });
    };

    bootstrapAsync();
  }, []);

  if (state.loading) {
    return <ActivityIndicator />
  }

  return (
    <AuthProvider value={authContext}>
      <StatusBar barStyle="light-content" />
      <Routes signed={!!state.token} />
    </AuthProvider>
  );
}

export default registerRootComponent(App);
