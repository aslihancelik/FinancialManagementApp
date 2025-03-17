import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorBoundary from './Components/ErrorBoundary.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
    <App />
  </ErrorBoundary>
  </StrictMode>,
)
