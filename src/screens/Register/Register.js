import React, { useState } from 'react';

import { View } from 'react-native';
import RegisterForm from './components/RegisterForm';

import useAuth from '../../hooks/useAuth';
import { authApi } from '../../api';

import styles from './styles';


export default function Register({ navigation }) {

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [values, setValues] = useState({ email: '' });

  const { signIn } = useAuth();

  const handleSubmit = async ({ email }) => {
    if (isSubmiting) return;
    try {
      setIsSubmiting(true);
      setValues({ email });

      const token = await authApi.register(email);

      await signIn(token);
    } catch (e) {
      console.log(e)
    } finally {
      setIsSubmiting(false);
    }
  }

  return (
    <View style={styles.container}>
      <RegisterForm
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
