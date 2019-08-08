import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import {toast} from 'react-toastify'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Error404 from './pages/Error404'

import NavBar from './components/NavBar'

toast.configure({
  hideProgressBar: true,
  newestOnTop: true
})

const App = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
