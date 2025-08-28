import axios from 'axios';
import { API_BASE_URL } from './config.js';
import { API_PRODUCTION_URL } from './config.js';
const http = axios.create({
    baseURL: API_BASE_URL,
    productionURL: API_PRODUCTION_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// Request: attach JWT if exists
http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // hoặc sessionStorage tuỳ bạn
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Response: normalize error & handle 401
http.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err?.response?.status;
        if (status === 401) {
            localStorage.removeItem('token');
            // tuỳ ý:
            // window.location.assign('/login');
        }
        return Promise.reject(err);
    }
);

export default http;