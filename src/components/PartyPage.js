import React, {useEffect, useState} from 'react'
import {useRouteMatch, Switch, Route, Link} from 'react-router-dom'
import MeetsPage from './MeetsPage'
import {db} from '../adapters/firebase'
import {useAuth} from '../contexts/AuthContext'

const PartyPage = () => {
    const [party, setParty] = useState([])
    const match = useRouteMatch()
    const {currentUser} = useAuth()

    const id = currentUser.uid

    useEffect(() => {
        const unsubParty = db
            .collection('party')
            .where('uids', 'array-contains', id)
            .onSnapshot(snapshot => {
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title
                }))
                setParty(list)
            })

        return () => {
            unsubParty()
        }
    }, [])

    return (
        <div>
            <h1>PARTY PAGE</h1>
            <ul>
                {!party
                    ? null
                    : party.map(item => (
                        <li key={item.id}>
                            <Link to={`${match.url}/${item.id}`}>{item.title}</Link>
                        </li>
                    ))}
            </ul>

            <hr/>

            <Switch>
                <Route path={`${match.path}/:party`}>
                    <MeetsPage/>
                </Route>
            </Switch>
        </div>
    )
}

export default PartyPage