import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5105',
});

export default api;