import React, {useEffect, useState} from 'react'
import {useRouteMatch, Switch, Route, Link, useHistory} from 'react-router-dom'
import MeetsPage from './MeetsPage'
import {db} from '../adapters/firebase'
import {useAuth} from '../contexts/AuthContext'

const PartyPage = () => {
    const [party, setParty] = useState([])
    const [currentParty, setCurrentParty] = useState('')
    // const match = useRouteMatch()
    const {currentUser} = useAuth()
    // const history = useHistory()

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
                setCurrentParty(list[0].id)
            })

        return () => {
            unsubParty()
        }
    }, [])

    return (
        <div>
            <h1>PARTY PAGE</h1>
            <form>
                <fieldset>
                    {!party
                        ? null
                        : party.map(item => (
                            <label
                                key={item.id}
                            >
                                <input
                                    type="radio"
                                />
                                {item.title}
                            </label>
                        ))}
                </fieldset>
            </form>

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