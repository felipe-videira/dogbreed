import React from 'react';
import { Header as RNEHeader, Button } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { string, func } from 'prop-types';

import styles from "./styles";


function Header({
  onGoBack,
  onLogout,
  backgroundColor,
  iconColor
}) {
  return (
    <RNEHeader
      backgroundColor={backgroundColor}
      containerStyle={styles.headerContainer}
      leftComponent={(onGoBack || onLogout) && (
        <Button
          type="clear"
          onPress={onGoBack || onLogout}
          icon={onGoBack
              ? <MaterialIcons
                style={styles.buttonIcon}
                color={iconColor}
                name="arrow-back"
              />
              : <MaterialCommunityIcons
                style={styles.buttonIcon}
                color={iconColor}
                name="exit-run"
              />}
        />
      )}
    />
  );
}

Header.propTypes = {
  onGoBack: func,
  onLogout: func,
  backgroundColor: string,
  iconColor: string
}

Header.defaultProps = {
  onGoBack: null,
  onLogout: null,
  backgroundColor: 'transparent',
  iconColor: 'white'
}

export default Header;
