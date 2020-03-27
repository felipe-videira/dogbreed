import React from 'react';

import { Image } from "react-native-expo-image-cache";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Header from '../../../components/Header';
import { View } from 'react-native';

import PropTypes from 'prop-types';

import styles from '../styles';


function PhotoDisplay({
  onGoBack,
  uri,
  imageSize
}) {
  return (
    <View style={styles.container}>
      <Header onGoBack={onGoBack} />
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

PhotoDisplay.propTypes = {
  uri: PropTypes.string.isRequired,
  onGoBack: PropTypes.func.isRequired,
  imageSize: PropTypes.shape({
    width: PropTypes.number,
    heigth: PropTypes.number
  }).isRequired,
}

export default PhotoDisplay;
