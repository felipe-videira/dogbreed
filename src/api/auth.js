import request from '../services/request';

export const register = async email => {
  const { user } = await request('/register', 'POST', { email });

  return user.token;
}
