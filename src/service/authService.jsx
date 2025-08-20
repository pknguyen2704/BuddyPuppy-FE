import http from "../config/http";
import { ENDPOINTS } from "../config/config";

export async function login(username, password) {
    const { data } = await http.post(ENDPOINTS.auth.login, { username, password });
    // server trả: { message, token, user }
    // Lưu token để auto gửi ở các request sau
    if (data?.token) localStorage.setItem('token', data.token);
    return data; // { message, token, user }
}

export async function register(payload) {
    const { data } = await http.post(ENDPOINTS.auth.register, payload);
    return data;
}

// export async function logout() {
//   try {
//     await http.post(ENDPOINTS.auth.logout);
//   } finally {
//     localStorage.removeItem('token');
//   }
// }