import {BrowserRouter, Switch, Route} from 'react-router-dom'

// Pages
import Landing from './pages/Landing'
import Meets from './pages/Meets'
import Meet from './pages/Meet'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'

// Routes
import * as ROUTE from './constants/routes'
import PrivateRoute from './components/PrivateRoute'

import NavBar from './components/NavBar'

import {MeetProvider} from './contexts/MeetContext'

export default function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Switch>
                <Route path={ROUTE.LANDING} exact component={Landing}/>
                <MeetProvider>
                    <PrivateRoute path={ROUTE.MEETS} exact component={Meets}/>
                    <PrivateRoute path={ROUTE.MEET} component={Meet}/>
                </MeetProvider>
                <Route path={ROUTE.SIGNUP} component={SignUp}/>
                <Route path={ROUTE.SIGNIN} component={SignIn}/>
                <Route path={ROUTE.RESET_PASSWORD} component={ResetPassword}/>
            </Switch>
        </BrowserRouter>
    )
}
