import {BrowserRouter, Switch, Route} from 'react-router-dom'

// Pages
import Landing from './pages/Landing'
import Meets from './pages/Meets'
import Meet from './pages/Meet'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'

// Components
import NavBar from './components/NavBar'

// Routes
import * as ROUTE from './constants/routes'
import PrivateRoute from './components/PrivateRoute'


export default function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Switch>
                <Route path={ROUTE.LANDING} exact component={Landing}/>
                <PrivateRoute path={ROUTE.MEETS} exact component={Meets}/>
                <PrivateRoute path={ROUTE.MEET} component={Meet}/>
                <Route path={ROUTE.SIGNUP} component={SignUp}/>
                <Route path={ROUTE.SIGNIN} component={SignIn}/>
                <Route path={ROUTE.RESET_PASSWORD} component={ResetPassword}/>
            </Switch>
        </BrowserRouter>
    )
}
