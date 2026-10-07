import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Prerendered pages ship real markup, so hydrate over it instead of throwing it
// away and repainting. The boot splash is the only case with nothing to hydrate.
if (container.dataset.prerendered === 'true') {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
