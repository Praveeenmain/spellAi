import React, { useState } from 'react'
import { Switch,Route } from 'react-router-dom'
import Signup from './components/signup/signup'
import Home from './components/Home'
import Login from './components/Login/login'
import ProtectedRoute from './components/ProtectedRoute'
import PrivateRoute from './components/PrivateRoute/private'
const App = () => {


  return (
    <>
    <Switch>
      <PrivateRoute exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/login" component={Login} />
     
      <ProtectedRoute exact path="/" component={Home } />
      
       
    </Switch>
    
    </>
  )
}

export default App
