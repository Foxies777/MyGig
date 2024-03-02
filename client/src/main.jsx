import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import User from './store/User.js'
import Streets from './store/Streets.js'
import Notification from './store/Notification.js'
export const Context = createContext(null)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new User(),
      streets: new Streets(),
      notifications: new Notification()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
)
