import React from 'react';
import { Header as RNEHeader, Button } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { string, func } from 'prop-types';

import styles from "./styles";
import {
  LOGOUT_ICON_NAME,
  GOBACK_ICON_NAME
} from '../../constants';


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
          icon={onGoBack ? (
            <MaterialIcons
              style={styles.buttonIcon}
              color={iconColor}
              name={GOBACK_ICON_NAME}
            />
          ) : (
            <MaterialCommunityIcons
              style={styles.buttonIcon}
              color={iconColor}
              name={LOGOUT_ICON_NAME}
            />
          )}
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
