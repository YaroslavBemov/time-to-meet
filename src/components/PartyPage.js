import React, {useEffect, useState} from 'react'
import {useRouteMatch, Switch, Route, Link, useHistory} from 'react-router-dom'
import MeetsPage from './MeetsPage'
import {db} from '../adapters/firebase'
import {useAuth} from '../contexts/AuthContext'

const PartyPage = () => {
    const [party, setParty] = useState([])
    const [currentParty, setCurrentParty] = useState('')
    const {currentUser} = useAuth()

    const id = currentUser.uid

    const handleChange = e => {
        const {value} = e.target
        setCurrentParty(value)
    }

    useEffect(() => {
        const unsubParty = db
            .collection('party')
            .where('uids', 'array-contains', id)
            .onSnapshot(snapshot => {
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title
                }))
                console.log(list)
                setParty(list)
                setCurrentParty(list[0].id)
            })

        return () => {
            unsubParty()
        }
    }, [])

    return (
        <div>
            <h1>PARTY PAGE</h1>
            <div>
                {!party
                    ? null
                    : party.map(item => (
                        <label
                            key={item.id}
                        >
                            <input
                                type="radio"
                                id={item.title}
                                name='party'
                                value={item.id}
                                checked={currentParty === item.id}
                                onChange={handleChange}
                            />
                            {item.title}
                        </label>
                    ))}
            </div>

            <hr/>

            <MeetsPage currentParty={currentParty}/>

            {/*<Switch>*/}
            {/*    <Route path={`${match.path}/:party`}>*/}
            {/*        <MeetsPage  currentId={currentId}/>*/}
            {/*    </Route>*/}
            {/*</Switch>*/}
        </div>
    )
}

export default PartyPage