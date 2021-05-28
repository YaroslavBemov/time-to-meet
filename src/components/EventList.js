import React from 'react'
import {useRouteMatch, Switch, Route, Link} from 'react-router-dom'

const EventList = () => {
    const match = useRouteMatch();

    return (
        <div>
            <h1>EventList</h1>
            <p>MATCH URL - {`${match.url}`}</p>
            <p>MATCH PATH - {`${match.path}`}</p>
        </div>
    )
}

export default EventList