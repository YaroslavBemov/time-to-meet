import {BrowserRouter, Switch, Route} from 'react-router-dom'

// Pages
import Landing from './pages/Landing'
import Meets from './pages/Meets'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'

// Routes
import * as ROUTE from './constants/routes'
import PrivateRoute from './components/PrivateRoute'

import NavBar from './components/NavBar'

export default function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Switch>
                <Route path={ROUTE.LANDING} exact component={Landing}/>
                <PrivateRoute path={ROUTE.MEETS} exact component={Meets}/>
                <Route path={ROUTE.SIGNUP} component={SignUp}/>
                <Route path={ROUTE.SIGNIN} component={SignIn}/>
                <Route path={ROUTE.RESET_PASSWORD} component={ResetPassword}/>
            </Switch>
        </BrowserRouter>
    )
}
