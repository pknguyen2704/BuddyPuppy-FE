// config.js
const isProduction = import.meta.env.MODE === 'production';

export const API_BASE_URL = isProduction
  ? import.meta.env.VITE_API_PRODUCTION_URL   // Cloud Run backend
  : import.meta.env.VITE_API_BASE_URL;        // Local backend

export const ENDPOINTS = {
  status: '/status',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  tts: {
    ttsFunction: '/textToSpeech/speak',
  },
  pecs: {
    getAll: '/pecs/all-animals',
    getOne: '/pecs/one-animal',
  }
};
