import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'), // gán ~ = src
      '@': path.resolve(__dirname, 'src'), // bạn cũng có thể dùng @
    },
  },
})
