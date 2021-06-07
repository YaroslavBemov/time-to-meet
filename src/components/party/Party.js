import React, {useContext, useEffect} from 'react'

import {db} from '../../adapters/firebase'
import {useAuth} from '../../contexts/AuthContext'
import {MainContext} from '../../contexts/MainContext'

import styles from './Party.module.sass'

const Party = () => {
    console.log('PARTY')
    const {
        party, setParty,
        currentParty, setCurrentParty
    } = useContext(MainContext)
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
        <section className="party">
            <h1 className={styles.heading}>Команды</h1>
            <div>
                {!party
                    ? null
                    : party.map(item => (
                        <label
                            className={styles.label}
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
        </section>
    )
}

export default Party