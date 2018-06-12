import axios from 'axios';

const axiosOrders = axios.create({
  baseURL: 'https://burger-builder-5c675.firebaseio.com/'
});

export default axiosOrders;