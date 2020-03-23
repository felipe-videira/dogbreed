import axios from 'axios';
import { getToken } from './auth';
import { API_HOST } from 'react-native-dotenv'

export default async (
    path,
    method = 'GET',
    data = null,
    options = {},
    baseUrl = API_HOST,
) => {
    try {
      const token = await getToken();
      const { data: res } = await axios({
          method,
          url: baseUrl + path,
          data,
          headers: {
              "Content-Type": "application/json",
              Authorization: token,
          },
          ...options
      })
      return res;
    } catch (e) {
        throw e.response && e.response.data.error;
    }
}
