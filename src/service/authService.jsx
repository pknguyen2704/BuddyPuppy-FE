import http from "../config/http";
import { ENDPOINTS } from "../config/config";

export async function login(username, password) {
    try {
        const { data } = await http.post(ENDPOINTS.auth.login, { username, password });
        if (data?.token) localStorage.setItem('token', data.token);
        return data;
    } catch (err) {
        console.error('Login failed:', err.response?.data || err.message);
        throw err; // để component xử lý hiển thị lỗi
    }
}

export async function register(payload) {
    const { data } = await http.post(ENDPOINTS.auth.register, payload);
    return data;
}

export async function logout() {
    try {
        await http.post(ENDPOINTS.auth.logout);
    } finally {
        localStorage.removeItem('token');
    }
}
