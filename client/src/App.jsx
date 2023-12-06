import { BrowserRouter } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import AppRouter from './components/AppRouter'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { observer } from 'mobx-react-lite';
import { Context } from './main';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';


const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    check().then(data =>{
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])
  if (loading) {
    return <Spinner animation='grow'/>
  }
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>

  )
})

export default App
