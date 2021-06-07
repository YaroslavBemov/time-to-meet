import React, {useContext, useEffect, useState} from 'react'
import Meets from './Meets'
import {db} from '../adapters/firebase'
import {useAuth} from '../contexts/AuthContext'
import {MainContext} from '../contexts/MainContext'

const Party = () => {
    const [party, setParty] = useState([])
    const {currentParty, setCurrentParty} = useContext(MainContext)
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
                setParty(list)
                // list[0]?.id
                setCurrentParty(list[0].id)
            })

        return () => {
            unsubParty()
        }
    }, [id])

    return (
        <section className='party'>
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
                                name="party"
                                value={item.id}
                                checked={currentParty === item.id}
                                onChange={handleChange}
                            />
                            {item.title}
                        </label>
                    ))}
            </div>

            <hr/>


        </section>
    )
}

export default Party