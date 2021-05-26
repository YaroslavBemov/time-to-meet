import React, {memo, useEffect, useState} from 'react'
import Meets from './Meets'
import Meet from './Meet'
import {db} from '../../adapters/firebase'
import {useAuth} from '../../contexts/AuthContext'

const Party = memo(() => {
    console.log('render party')
    const [party, setParty] = useState([])
    const {currentUser} = useAuth()
    const id = currentUser.uid

    useEffect(() => {
        const unsubscribeParty = db
            .collection('party')
            .where('members', 'array-contains', id)
            .get()
            .then(docs => {
                const data = []
                docs.forEach(doc => {
                    data.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setParty(data)
            })

        return () => {
            // unsubscribeParty()
        }
    }, [])

    return (
        <>
            <section className='party'>
                <h1>Party</h1>
                {party && party.map(item => (
                    <div>
                        {item.id}
                    </div>
                ))}
            </section>
        </>
    )
})

export default Party