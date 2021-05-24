import {BrowserRouter, Switch, Route} from 'react-router-dom'

// Pages
import Landing from './pages/Landing'
import Main from './pages/Main'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'

// Components
import NavBar from './components/nav/NavBar'
import Party from './components/main/Party'
import Meets from './components/main/Meets'
import Meet from './components/main/Meet'

// Routes
import * as ROUTE from './constants/routes'
import PrivateRoute from './components/PrivateRoute'


export default function App() {
    return (
        <BrowserRouter>
            <header>
                <NavBar/>
            </header>
            {/*<main>*/}
                <Switch>
                    <Route path={ROUTE.LANDING} exact component={Landing}/>
                    <PrivateRoute path={ROUTE.MAIN} exact component={Main}/>
                    <PrivateRoute path={ROUTE.PARTY} exact component={Party}/>
                    <PrivateRoute path={ROUTE.MEETS} exact component={Meet}/>
                    <PrivateRoute path={ROUTE.MEET} component={Meet}/>
                    <Route path={ROUTE.SIGNUP} component={SignUp}/>
                    <Route path={ROUTE.SIGNIN} component={SignIn}/>
                    <Route path={ROUTE.RESET_PASSWORD} component={ResetPassword}/>
                </Switch>
            {/*</main>*/}
        </BrowserRouter>
    )
}
