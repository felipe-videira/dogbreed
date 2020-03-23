import request from '../services/request';

export const list = async breed => {
  const { list } = await request(`/list?breed=${breed}`);

  return list;
}
