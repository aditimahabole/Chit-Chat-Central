import React from 'react'
import 'rsuite/dist/rsuite.min.css';
import './styles/main.scss';
import {Switch} from 'react-router';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';


const App = () => {
  return (
    <Switch>
      <PublicRoute>
        <SignIn></SignIn>
      </PublicRoute>
      <PrivateRoute path="/">
        <Home></Home>
      </PrivateRoute>
    </Switch>
  )
}

export default App