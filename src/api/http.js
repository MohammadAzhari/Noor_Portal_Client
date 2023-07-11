import axios from 'axios';
import storage from '../localstorage';

// create a http instance with headers
const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((req) => {
  const token = storage.getToken();
  req.headers.Authorization = 'Bearer ' + token;
  return req;
});

export const handler = async (req) => {
  try {
    const { data } = await req;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status == 401) {
        // storage.removeToken();
        // window.location.reload();
      }
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export default http;
