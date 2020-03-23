import React, { useState, useEffect } from 'react';
import { registerRootComponent } from 'expo';

import { StatusBar } from 'react-native';
import Routes from './routes';

import { isSignedIn } from "./services/auth";


function App() {

  const [signed, setSigned] = useState(false);
  const [signLoaded, setSignLoaded] = useState(false);

  useEffect(() => {
    isSignedIn()
      .then(res => {
        setSigned(res);
        setSignLoaded(true);
      })
      .catch(err => console.log(err))
  }, [])

  if (!signLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Routes signed={signed} />
    </>
  );
}

export default registerRootComponent(App);
