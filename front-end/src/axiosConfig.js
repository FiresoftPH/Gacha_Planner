
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.0.5.171:5000/api',
  withCredentials: true,
});

console.log('Configured baseURL:', instance.defaults.baseURL);

export default instance;
