import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'




import Chessboard from './components/chessboard.jsx'
// import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Chessboard />
  </StrictMode>,
)
