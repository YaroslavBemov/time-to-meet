import React, {memo, useEffect, useState} from 'react'
import Meets from './Meets'
import Meet from './Meet'
import {db} from '../../adapters/firebase'
import {useAuth} from '../../contexts/AuthContext'
import {Link} from 'react-router-dom'
import {MEET, MEETS, PARTY} from '../../constants/routes'

const Party = memo(() => {
    console.log('render party')
    const [party, setParty] = useState([])
    const {currentUser} = useAuth()
    const id = currentUser.uid

    useEffect(() => {
        const unsubscribeParty = db
            .collection('meets')
            .where('party', '==', 'EcIKtQ2CMW276G0INlFB')
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
                        <Link to={`${MEET}/${item.id}`}>{item.name}</Link>
                        <Link to={`${MEETS}/EcIKtQ2CMW276G0INlFB`}>{item.name}</Link>
                    </div>
                ))}
            </section>
        </>
    )
})

export default Party
