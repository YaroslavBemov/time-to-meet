import React, {useContext, useEffect, useState} from 'react'
import {db} from '../adapters/firebase'
import Meet from './Meet'
import {MainContext} from '../contexts/MainContext'

const Meets = () => {
    const [meets, setMeets] = useState([])
    const {currentParty, currentMeet, setCurrentMeet} = useContext(MainContext)

    const handleChange = e => {
        const {value} = e.target
        setCurrentMeet(value)
    }

    useEffect(() => {
        if (currentParty) {
            const unsubMeets = db
                .collection('meets')
                .where('party', '==', currentParty)
                .onSnapshot(snapshot => {
                    const list = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setMeets(list)
                    setCurrentMeet(list[0]?.id)
                })

            return () => {
                unsubMeets()
            }
        }
    }, [currentParty])

    return (
        <section className='meets'>
            <h1>MEETS PAGE</h1>
            <form>
                {!meets
                    ? null
                    : meets.map(item => (
                        <label
                            key={item.id}
                        >
                            <input
                                type="radio"
                                id={item.title}
                                name="meet"
                                value={item.id}
                                checked={currentMeet === item.id}
                                onChange={handleChange}
                            />
                            {item.id}
                        </label>
                    ))}
            </form>

            <hr/>


        </section>

    )
}

export default Meets