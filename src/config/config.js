export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
    status: '/status',
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
    },
    tts: {
        ttsFunction: '/textToSpeech/speak',
    }
};