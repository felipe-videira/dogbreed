import React from 'react';
import { Header as RNEHeader, Button } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { string, func } from 'prop-types';

import styles from "./styles";


function Header({
  onGoBack,
  onLogout,
  backgroundColor
}) {
  return (
    <RNEHeader
      backgroundColor={backgroundColor}
      containerStyle={styles.headerContainer}
      leftComponent={(onGoBack || onLogout) && (
        <Button
          type="clear"
          onPress={onGoBack || onLogout}
          style={styles.buttonIcon}
          icon={onGoBack
              ? <MaterialIcons style={styles.buttonIcon} name="arrow-back" />
              : <MaterialCommunityIcons style={styles.buttonIcon} name="exit-run"/>}
        />
      )}
    />
  );
}

Header.propTypes = {
  onGoBack: func,
  onLogout: func,
  backgroundColor: string,
}

Header.defaultProps = {
  onGoBack: null,
  onLogout: null,
  backgroundColor: 'transparent',
}

export default Header;
