import axios from 'axios';

export const api = axios.create({ baseURL: '/api/' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (
    token &&
    !config.url?.includes('register') &&
    !config.url?.includes('token')
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem('refresh');
        const response = await axios.post('/api/token/refresh/', { refresh });
        const newAccess = response.data.access;

        localStorage.setItem('token', newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');

        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
