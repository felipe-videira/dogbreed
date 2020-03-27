import React, { useContext } from 'react';
import { Formik } from 'formik';

import { View } from 'react-native';
import { Input, Button, ThemeContext } from 'react-native-elements';
import { FontAwesome as Icon } from '@expo/vector-icons';

import * as Yup from 'yup';
import PropTypes from 'prop-types';

import styles from '../styles';

function RegisterForm({
  values,
  onSubmit,
  emailLabel,
  submitTitle,
  invalidEmailText,
  requiredEmailText
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <Formik
      initialValues={values}
      onSubmit={onSubmit}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(invalidEmailText)
          .required(requiredEmailText)
      })}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        isSubmitting,
        errors,
        touched,
      }) => (
          <View style={styles.container}>
            <Input
              label={emailLabel}
              value={values.email}
              keyboardType="email-address"
              returnKeyType="next"
              enablesReturnKeyAutomatically={true}
              autoCapitalize='none'
              onChangeText={handleChange('email')}
              errorMessage={touched.email && errors.email}
              disabled={isSubmitting}
              onEndEditing={handleSubmit}
            />
            <Button
              type="clear"
              title={submitTitle}
              onPress={handleSubmit}
              disabled={!values.email}
              loading={isSubmitting}
              titleStyle={styles.buttonTitle}
              iconRight
              icon={
                <Icon
                name="long-arrow-right"
                color={theme.colors[values.email ? 'primary' : 'disabled']}
                style={styles.buttonIcon}
                />
              }
            />
          </View>
        )}
    </Formik>
  );
}

RegisterForm.propTypes = {
  values: PropTypes.exact({
    email: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  emailLabel: PropTypes.string.isRequired,
  submitTitle: PropTypes.string.isRequired,
  requiredEmailText: PropTypes.string.isRequired,
  invalidEmailText: PropTypes.string.isRequired,
}

RegisterForm.defaultProps = {
  values: { email: '' },
}

export default RegisterForm;

