import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.194.82.36:3333'
});

export default api;