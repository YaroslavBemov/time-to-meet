import React from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import {PARTY} from '../constants/routes'
import Party from '../components/Party'

const MeetApp = () => {
    return (
        <div>
            <h1>APP</h1>
            <ul>
                <li>
                    <Link to={'/team1'}>Team 1</Link>
                </li>
                <li>
                    <Link to={'/team2'}>Team 2</Link>
                </li>
                <li>
                    <Link to={'/team3'}>Team 3</Link>
                </li>
            </ul>
            <Switch>
                <Route path={PARTY}>
                    <Party/>
                </Route>
            </Switch>
        </div>

    )
}

export default MeetApp