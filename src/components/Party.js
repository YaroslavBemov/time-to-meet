import React from 'react'
import {useRouteMatch, Switch, Route, Link} from 'react-router-dom'

const Party = () => {
    const match = useRouteMatch()
    return (
        <div>
            <h2>Party</h2>
            {/*<Link to={`${match.url}`}>Summary</Link>*/}
            {/*<Link to={`${match.url}/events`}>Events</Link>*/}
            <p>{match.url}</p>
            {/*<p>{match.params}</p>*/}
            <p>{match.isExact}</p>
            <p>{match.path}</p>
            {/*<Switch>*/}
            {/*    <Route path={`${match.path}/events`}>*/}
            {/*        <Party />*/}
            {/*    </Route>*/}
            {/*    <Route path={match.path}>*/}
            {/*        <Party />*/}
            {/*    </Route>*/}
            {/*</Switch>*/}
        </div>
    )
}

export default Party