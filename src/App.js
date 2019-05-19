import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
