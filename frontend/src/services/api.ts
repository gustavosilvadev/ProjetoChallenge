import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5105', // Substitua pela URL da sua API .NET
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };