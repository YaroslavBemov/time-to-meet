import React from 'react'
import {useRouteMatch, Switch, Route, Link} from 'react-router-dom'
import EventList from "./EventList";
import Summary from "./Summary";
import MeetsPage from "./MeetsPage";

const PartyPage = () => {
    const match = useRouteMatch();

    return (
        <div>
            <h1>PARTY PAGE</h1>
            <ul>
                {/*<li>*/}
                {/*    <Link to={`${match.url}`}>Summary</Link>*/}
                {/*</li>*/}
                <li>
                    <Link to={`${match.url}/party1`}>Party 1</Link>
                </li>
                <li>
                    <Link to={`${match.url}/party2`}>Party 2</Link>
                </li>
            </ul>

            <hr/>

            <Switch>
                <Route path={`${match.path}/:party`}>
                    <MeetsPage/>
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

export default PartyPage