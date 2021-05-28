import React from 'react'
import {useRouteMatch, Switch, Route, Link} from 'react-router-dom'

const MeetTest = () => {
    const match = useRouteMatch()

    return (
        <div>
            <h2>MEET TEST</h2>
            <p>MATCH URL - {`${match.url}`}</p>
            <p>MATCH PATH - {`${match.path}`}</p>
        </div>
    )
}

export default MeetTest