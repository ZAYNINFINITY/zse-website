import Cookies from 'js-cookie';
import { authAPI } from './api';

export const setAuthToken = (token) => {
  if (token) {
    Cookies.set('token', token, { expires: 7 });
  } else {
    Cookies.remove('token');
  }
};

export const getAuthToken = () => {
  return Cookies.get('token');
};

export const logout = () => {
  Cookies.remove('token');
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const getCurrentUser = async () => {
  try {
    const response = await authAPI.getMe();
    return response.data.user;
  } catch (error) {
    return null;
  }
};


