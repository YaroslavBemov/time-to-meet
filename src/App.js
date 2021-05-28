import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'

// Pages
import Landing from './pages/Landing'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'
import MeetApp from './pages/MeetApp'

// Components
import NavBar from './components/NavBar'

// Routes
import * as ROUTE from './constants/routes'
import PrivateRoute from './components/PrivateRoute'
import Portfolio from "./components/Portfolio";


export default function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Link to="/meetapp">Meet App</Link><br/>
            <Link to="/portfolio">Portfolio</Link>
            <Switch>
                <Route path={ROUTE.LANDING} exact component={Landing}/>
                <Route path={ROUTE.SIGNUP} component={SignUp}/>
                <Route path={ROUTE.SIGNIN} component={SignIn}/>
                <Route path={ROUTE.RESET_PASSWORD} component={ResetPassword}/>
                {/*<PrivateRoute path={ROUTE.APP} exact component={MeetApp}/>*/}
                <Route path="/meetapp">
                    <MeetApp />
                </Route>
                <Route path="/portfolio">
                    <Portfolio />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
