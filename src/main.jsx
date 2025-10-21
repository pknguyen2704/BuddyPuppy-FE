import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import theme from '~/theme.js'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { store } from '~/redux/store'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    </Provider>
  </BrowserRouter>

)
