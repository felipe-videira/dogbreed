import React, { useState } from 'react';

import RegisterForm from './components/RegisterForm';

import useAuth from '../../hooks/useAuth';
import { authApi } from '../../api';
import i18n from 'i18n-js';


export default function Register() {

  const [isSubmiting, setIsSubmiting] = useState(false);

  const { signIn } = useAuth();

  const handleSubmit = async ({ email }) => {
    if (isSubmiting) return;
    try {
      setIsSubmiting(true);

      const token = await authApi.register(email);

      await signIn(token);
    } catch (e) {
      console.log(e)
    } finally {
      setIsSubmiting(false);
    }
  }

  return (
    <RegisterForm
      onSubmit={handleSubmit}
      invalidEmailText={i18n.t('invalidEmailText')}
      requiredEmailText={i18n.t('requiredEmailText')}
      emailLabel={i18n.t('emailLabel')}
      submitTitle={i18n.t('submitTitle')}
    />
  );
}
