import React, { useContext } from 'react';
import { withFormik } from 'formik';

import { View } from 'react-native';
import { Input, Button, ThemeContext } from 'react-native-elements';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { string, object } from 'yup';

import styles from '../styles/form';


const Form = ({
  values,
  handleSubmit,
  setFieldValue,
  isSubmitting,
  errors,
  touched,
  emailLabel,
  submitTitle
}) => {
    const { theme } = useContext(ThemeContext);

    return (
      <View style={styles.container}>
        <Input
          label={emailLabel}
          value={values.email}
          onChangeText={text => setFieldValue('email', text)}
          errorMessage={touched.email && errors.email && errors.email}
          disabled={isSubmitting}
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
            size={20}
            color={values.email
                ? theme.colors.primary
                : theme.colors.disabled}
            style={styles.buttonIcon}
          />}
        />
      </View>
  );
}

export default withFormik({
  mapPropsToValues: (props) => props.values,
  validationSchema: props => object().shape({
    email: string()
      .email(props.invalidEmailText)
      .required(props.requiredEmailText),
  }),
  handleSubmit: (values, { props }) => props.handleSubmit(values)
})(Form);
