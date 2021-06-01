import React, {useEffect, useState} from 'react'
import {Link, Switch, Route, useRouteMatch} from 'react-router-dom'
import MeetPage from './MeetPage'
import {db} from '../adapters/firebase'
import Meet from '../pages/Meet'

const MeetsPage = () => {
    const [meets, setMeets] = useState([])
    const match = useRouteMatch()
    const party = match.params.party

    useEffect(() => {
        const unsubMeets = db
            .collection('meets')
            .where('party', '==', party)
            .onSnapshot(snapshot => {
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setMeets(list)
            })
    }, [party])

    return (
        <div>
            <h1>MEETS PAGE</h1>
            <ul>
                {!meets
                    ? null
                    : meets.map(item => (
                        <li key={item.id}>
                            <Link to={`${match.url}/${item.id}`}>{item.id}</Link>
                        </li>
                    ))}
            </ul>

            <hr/>

            <Switch>
                <Route path={`${match.path}/:meet`}>
                    <Meet/>
                </Route>
            </Switch>
        </div>

    )
}

export default MeetsPage