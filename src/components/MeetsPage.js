import React from 'react'
import {Link, Switch, Route, useRouteMatch} from 'react-router-dom'
import MeetPage from './MeetPage'

const MeetsPage = () => {
    const match = useRouteMatch()

    return (
        <div>
            <h1>MEETS PAGE</h1>
            <ul>
                <li>
                    <Link to={`${match.url}/meet1`}>Meet 1</Link>
                </li>
                <li>
                    <Link to={`${match.url}/meet2`}>Meet 2</Link>
                </li>
                <li>
                    <Link to={`${match.url}/meet3`}>Meet 3</Link>
                </li>
            </ul>

            <hr/>

            <Switch>
                <Route path={`${match.path}/:meet`}>
                    <MeetPage/>
                </Route>
            </Switch>
        </div>

    )
}

export default MeetsPage