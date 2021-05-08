import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'

// Pages
import Landing from './pages/Landing'
import Meets from './pages/Meets'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'

// Routes
import * as ROUTE from './constants/routes'

import {AuthProvider} from './contexts/AuthContext'
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Link to={ROUTE.MEETS}>Meets</Link><br/>
                <Link to={ROUTE.SIGNUP}>Sign Up</Link><br/>
                <Link to={ROUTE.SIGNIN}>Sign In</Link><br/>
                <Link to={ROUTE.RESET_PASSWORD}>Reset Password</Link><br/>
                <Switch>
                    <Route path={ROUTE.LANDING} exact component={Landing}/>
                    <PrivateRoute path={ROUTE.MEETS} exact component={Meets}/>
                    <Route path={ROUTE.SIGNUP} component={SignUp}/>
                    <Route path={ROUTE.SIGNIN} component={SignIn}/>
                    <Route path={ROUTE.RESET_PASSWORD} component={ResetPassword}/>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
}
