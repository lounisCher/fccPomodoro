import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//apparently the tester of fcc have issues with this version of react but all features of this code works correctly you can test it by yourself and run it
createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <App />
  //</StrictMode>, //i disabled the strict mode to ensure that the tester of fcc work
)
