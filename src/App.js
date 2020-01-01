import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserProvider } from './UserContext'

import Home from './pages/Home'
import PostPage from './pages/PostPage'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Error404 from './pages/Error404'

import NavBar from './components/NavBar'
import LoginWatcher from './components/LoginWatcher'

toast.configure({
  hideProgressBar: true,
  newestOnTop: true,
  autoClose: 3000
})

const App = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
      <UserProvider>
        <LoginWatcher />
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/wh/:postID" exact component={PostPage} />
          <Route path="/p/:username" exact component={Profile} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route component={Error404} />
        </Switch>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App;
