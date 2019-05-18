import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'

import Wakeup from './pages/Wakeup'
import Hole from './pages/Hole'

const App = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
      <Switch>
        <Route path="/" exact component={Wakeup} />
        <Route path="/hole" exact component={Hole} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
