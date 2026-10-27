import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const RrDemo = lazy(() => import('./demo/rr/RrDemo.jsx'))
const showDemo = new URLSearchParams(window.location.search).get('demo') === 'rr'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {showDemo ? <Suspense fallback={<div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#142b26', color: '#c6e3cc' }} role="status">Opening RR ERP…</div>}><RrDemo /></Suspense> : <App />}
  </StrictMode>,
)
