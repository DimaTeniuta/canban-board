import axios from 'axios';
import { IAuthResponse } from '../types/authResponse';
import { notificationStore } from '../store/notificationStore/notificationStore';
import store from '../store/root';

export const API_URL = 'http://localhost:2300/';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && error.config && !error.config?._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          originalRequest._isRetry = false;
          localStorage.setItem('token', response.data.accessToken);
        } else {
          store.user.removeUserFromStore();
        }
        return api.request(originalRequest);
      } catch (e) {
        console.log('Unauthorized');
      }
    }
    notificationStore.openErrorAlert(error?.response?.data);
    return error;
  }
);

export default api;
