import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './todo_css/todo.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
    </StrictMode>
)
