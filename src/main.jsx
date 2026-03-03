import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthProvider.jsx'
import { SongContext } from './Context/SongContext.jsx'
import { PlaylistContextProvider } from './Context/PlaylistContextProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SongContext>
      <PlaylistContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PlaylistContextProvider>
    </SongContext>
  </AuthProvider>

)
