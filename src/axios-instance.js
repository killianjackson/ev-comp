import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://evcompare-89110.firebaseio.com'
});

export default instance;