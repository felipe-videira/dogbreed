import React, { useEffect, useState } from 'react';

import { Image } from "react-native";
import PhotoDisplay from './components/PhotoDisplay';


export default function Photo({
  route: { params: { uri } },
  navigation: { goBack }
}) {

  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      setImageSize({ width, height });
    }, goBack);
  }, []);

  return (
    <PhotoDisplay
      onGoBack={goBack}
      uri={uri}
      imageSize={imageSize}
    />
  );
}

