
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ALT_IMAGE } from '../../constants';
import { Image as RNImage } from "react-native";
import { Image as CachedImage } from "react-native-expo-image-cache";


function Image ({
  uri,
  style,
  showAltImageOnError
}) {
  const [error, setError] = useState(false);

  if (error && !showAltImageOnError) return null;

  return error ? (
    <RNImage
      source={ALT_IMAGE}
    />
  ) : (
    <CachedImage
      onError={() => setError(true)}
      uri={uri}
      style={style}
    />
  );
}

Image.propTypes = {
  showAltImageOnError: PropTypes.bool,
  uri: PropTypes.string.isRequired,
  style: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }).isRequired,
}

Image.defaultProps = {
  showAltImageOnError: true
}

export default Image;
