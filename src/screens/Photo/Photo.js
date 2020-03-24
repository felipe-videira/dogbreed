import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import Header from '../../components/Header';
import { Image as RNImage } from "react-native";
import { Image } from "react-native-expo-image-cache";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import styles from './styles';

export default function Photo({
  route: { params: { uri }},
  navigation: { goBack }
}) {

  const [imageSize, setImageSize] = useState({});

  useEffect(() => {
    RNImage.getSize(uri, (width, height) => {
      setImageSize({ width, height });
    }, goBack);
  }, []);

  return (
    <View style={styles.container}>
      <Header onGoBack={goBack} />
        <ReactNativeZoomableView
            maxZoom={1.5}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={false}
            style={styles.photoContainer}
          >
          <Image
            uri={uri}
            style={imageSize}
          />
        </ReactNativeZoomableView>
    </View>
  );
}

