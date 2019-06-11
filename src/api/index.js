import http from './http';

const client = new http();
client.init({
  baseURL: 'http://47.95.207.40/branch',
  timeout: 1000
});

export default client;