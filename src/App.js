import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

// Pages
import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'
import MainPage from './pages/MainPage'
import NewParty from './pages/NewParty'

// Components
import NavBar from './components/nav/NavBar'
import Playground from './components/playground/Playground'

// Routes
import * as ROUTE from './constants/routes'
import PrivateRoute from './components/PrivateRoute'

export default function App () {
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route path={ROUTE.LANDING} exact component={Landing}/>
        <Route path={ROUTE.SIGNUP} component={SignUp}/>
        <Route path={ROUTE.SIGNIN} component={SignIn}/>
        <Route path={ROUTE.RESET_PASSWORD} component={ResetPassword}/>
        <PrivateRoute path={ROUTE.MAIN} exact component={MainPage}/>
        <PrivateRoute path={ROUTE.NEW_PARTY} exact component={NewParty}/>
        <Route to='/playground' component={Playground}/>
        <Redirect to="/"/>
      </Switch>
    </BrowserRouter>
  )
}
