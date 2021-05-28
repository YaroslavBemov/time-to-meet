import React from 'react'
import {Link, Switch, Route, useRouteMatch} from 'react-router-dom'
import {PARTY} from '../constants/routes'
import MeetTest from '../components/MeetTest'

const MeetApp = () => {
    const match = useRouteMatch()

    return (
        <div>
            <h1>MEET APP</h1>
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
                    <MeetTest/>
                </Route>
                {/*<Route path={`${match.path}/meet2`}>*/}
                {/*    <MeetTest/>*/}
                {/*</Route>*/}
                {/*<Route path={`${match.path}/meet3`}>*/}
                {/*    <MeetTest/>*/}
                {/*</Route>*/}
                {/*<Route exact path={`${match.path}`}>*/}
                {/*    <h2>Summary</h2>*/}
                {/*</Route>*/}
            </Switch>
        </div>

    )
}

export default MeetApp