import axiosInstance, { request } from '../api/axios.js';

const BACKEND_ORIGIN = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL.replace(/\/api\/v1$/, '')
  : 'http://localhost:5000';

const getGoogleAuthUrl = () => `${BACKEND_ORIGIN}/api/v1/auth/google`;

const exchangeGoogleCode = async (code) => {
  const data = await request({
    url: '/auth/google/callback',
    method: 'GET',
    params: { code },
  });
  return data?.token;
};

const getCurrentUser = async (token) => {
  if (token) {
    localStorage.setItem('hiresync_token', token);
  }
  const user = await request({
    url: '/auth/me',
    method: 'GET',
  });
  return user;
};

const logout = async () => {
  await request({
    url: '/auth/logout',
    method: 'POST',
  });
};

export default {
  getGoogleAuthUrl,
  exchangeGoogleCode,
  getCurrentUser,
  logout,
};
