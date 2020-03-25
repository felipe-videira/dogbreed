import React, { useContext } from 'react';
import { withFormik } from 'formik';

import { View } from 'react-native';
import { Input, Button, ThemeContext } from 'react-native-elements';
import { FontAwesome as Icon } from '@expo/vector-icons';

import {
  string as yupString,
  object as yupObject
} from 'yup';

import {
  string as propString,
  object as propObject,
  func,
  bool
} from 'prop-types';

import styles from '../styles/registerForm';


function RegisterForm ({
  values,
  handleSubmit,
  setFieldValue,
  isSubmitting,
  errors,
  touched,
  emailLabel,
  submitTitle
}) {
    const { theme } = useContext(ThemeContext);

    return (
      <View style={styles.container}>
        <Input
          label={emailLabel}
          value={values.email}
          keyboardType="email-address"
          returnKeyType="next"
          enablesReturnKeyAutomatically={true}
          autoCapitalize='none'
          onChangeText={text => setFieldValue('email', text)}
          errorMessage={touched.email && errors.email && errors.email}
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
          icon={<Icon
            name="long-arrow-right"
            color={theme.colors[values.email ? 'primary' : 'disabled']}
            style={styles.buttonIcon}
          />}
        />
      </View>
  );
}

RegisterForm.propTypes = {
  values: propObject,
  isSubmitting: bool,
  handleSubmit: func.isRequired,
  setFieldValue: func.isRequired,
  errors: propObject.isRequired,
  touched: propObject.isRequired,
  emailLabel: propString.isRequired,
  submitTitle: propString.isRequired,
  requiredEmailText: propString.isRequired,
  invalidEmailText: propString.isRequired,
}

RegisterForm.defaultProps = {
  values: { email: '' },
  isSubmitting: false,
}

export default withFormik({
  mapPropsToValues: (props) => props.values,
  validationSchema: props => yupObject().shape({
    email: yupString()
      .email(props.invalidEmailText)
      .required(props.requiredEmailText),
  }),
  handleSubmit: (values, { props }) => props.handleSubmit(values)
})(RegisterForm);
