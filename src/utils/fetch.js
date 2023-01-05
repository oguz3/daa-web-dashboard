import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import Cookies from 'js-cookie';

const config = {
  responseType: 'json',
  timeout: 0,
  validateStatus: (status) => status >= 200 && status < 300, // default
};

const getUserFromLocalStorage = () => {
  try {
    return JSON.parse(Cookies.get('user') || '');
  } catch (error) {
    return null;
  }
};

const requestInterceptor = (config) => {
  const auth = getUserFromLocalStorage();
  const token = auth?.accessToken || null;

  config.headers = {
    ...config.headers,
    Accept: 'application/json',
  };

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const responseInterceptor = ({ data }) => {
  return data;
};

const instance = axios.create({
  ...config,
  baseURL: 'https://ensarkavak.fun/api/',
});

instance.interceptors.request.use(requestInterceptor, (error) => {
  //console.warn('request error', error)
  throw new Error(error);
});
let isRefreshing = false;
let subscribers = [];

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRefreshed(token) {
  subscribers.map((cb) => cb(token));
}

instance.interceptors.response.use(responseInterceptor, async (error) => {
  const errorKey = error?.response?.data?.error;
  const status = error?.response?.status;

  const auth = getUserFromLocalStorage();
  const token = auth?.accessToken;

  if (!error.response) {
    showNotification({
      title: 'Error',
      message: 'Please check your internet connection.',
    });
  }

  //status===401 && !token is the case for login/register errors
  if (((status === 401 && !token) || status !== 401) && !isRefreshing) {
    const errorMessage = errorKey
      ? errorKey
      : 'An error occurred, please try again later or contact us.';

    showNotification({
      title: 'Error',
      message: errorMessage,
    });
  }

  const refreshToken = auth?.refreshToken;
  const originalRequest = error.config;

  if (status === 401 && token) {
    if (!isRefreshing) {
      try {
        isRefreshing = true;
        const res = await axios.put(
          '/Users/RefreshTokenLogin',
          {
            token,
            refreshToken,
          },
          {
            baseURL: 'https://ensarkavak.fun/api/',
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        isRefreshing = false;
        onRefreshed(res.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        const newAuth = { ...auth, ...res.data };
        Cookies.set('user', JSON.stringify(newAuth));
        subscribers = [];
        return Promise.resolve(instance(originalRequest));
      } catch (error) {
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
  }

  return new Promise((resolve) => {
    subscribeTokenRefresh((token) => {
      originalRequest.headers.Authorization = `Bearer ${token}`;
      resolve(instance(originalRequest));
    });
  });
});

export default instance;
