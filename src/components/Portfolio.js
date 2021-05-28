import React from 'react'
import {useRouteMatch, Switch, Route, Link} from 'react-router-dom'
import EventList from "./EventList";
import Summary from "./Summary";

const Portfolio = () => {
    const match = useRouteMatch();

    return (
        <div>
            <h1>Portfolio</h1>
            <ul>
                {/*<li>*/}
                {/*    <Link to={`${match.url}`}>Summary</Link>*/}
                {/*</li>*/}
                <li>
                    <Link to={`${match.url}/events`}>Events</Link>
                </li>
                <li>
                    <Link to={`${match.url}/events2`}>Events 2</Link>
                </li>
            </ul>

            <hr/>

            <Switch>
                <Route path={`${match.path}/:event`}>
                    <EventList/>
                </Route>
                {/*<Route path={`${match.path}/events2`}>*/}
                {/*    <EventList/>*/}
                {/*</Route>*/}
                {/*<Route path={match.path}>*/}
                {/*    <Summary/>*/}
                {/*</Route>*/}
            </Switch>
        </div>
    );
};

export default Portfolio