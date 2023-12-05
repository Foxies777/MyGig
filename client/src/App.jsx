import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import AppRouter from './components/AppRouter'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>

  )
}

export default App
