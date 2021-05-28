import React from 'react'
import {useRouteMatch, Switch, Route, Link} from 'react-router-dom'

const MeetPage = () => {
    const match = useRouteMatch()

    return (
        <div>
            <h1>MEET PAGE</h1>
            <p>MATCH URL - {`${match.url}`}</p>
            <p>MATCH PATH - {`${match.path}`}</p>
        </div>
    )
}

export default MeetPage