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
        const { data: res } = await axios({
            method,
            url: baseUrl + path,
            data,
            options: {
                headers: {
                    ...(options.headers || {}),
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Content-Type": "application/json",
                    Authorization: await getToken(),
                },
                ...options
            }
        })
        return res;
    } catch (error) {
        throw error.response && error.response.data.message;
    }
}
