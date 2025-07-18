import type { UserResponse } from '@/types';
import axios from 'axios';

const Axios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

Axios.interceptors.request.use((config) => {
  const userInfoString: string | null = localStorage.getItem('userInfo');

  if (userInfoString) {
    try {
      const userData: UserResponse = JSON.parse(userInfoString);

      if (userData.token) {
        config.headers.Authorization = `Bearer ${userData?.token}`;
      }
    } catch (error) {
      console.log('axios-instance-error', error);
    }
  }

  return config;
});

export { Axios };
