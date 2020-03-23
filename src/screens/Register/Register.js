import React, { useState } from 'react';

import { View } from 'react-native';
import Form from './components/Form';

import styles from './styles';

import request from '../../services/request';
import { onSignIn } from '../../services/auth';


export default function Register({ navigation }) {

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [values, setValues] = useState({ email: '' });

  const handleSubmit = async values => {
    if (isSubmiting) return;
    try {
      setIsSubmiting(true);
      setValues(values);

      const { user } = await request('/register', 'POST', { email });

      await onSignIn(user.token);

      navigation.navigate('SignedIn');
    } catch (err) {
      console.log(err)
    } finally {
      setIsSubmiting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Form
        values={values}
        handleSubmit={handleSubmit}
        invalidEmailText={'Digite um e-mail válido'}
        requiredEmailText={'Preencha o campo de e-mail'}
        emailLabel={'Digite seu e-mail'}
        submitTitle={'Continuar'}
      />
    </View>
  );
}
