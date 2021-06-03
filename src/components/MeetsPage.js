import React, {useEffect, useState} from 'react'
import {Link, Switch, Route, useRouteMatch} from 'react-router-dom'
import MeetPage from './MeetPage'
import {db} from '../adapters/firebase'
import Meet from './Meet'

const MeetsPage = ({currentParty}) => {
    const [meets, setMeets] = useState([])
    const [currentMeet, setCurrentMeet] = useState('')

    const handleChange = e => {
        const {value} = e.target
        setCurrentMeet(value)
    }

    useEffect(() => {
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
    }, [currentParty])

    return (
        <div>
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
                                name='meet'
                                value={item.id}
                                checked={currentMeet === item.id}
                                onChange={handleChange}
                            />
                            {item.id}
                        </label>
                    ))}
            </form>

            <hr/>

            <Meet currentMeet={currentMeet}/>
        </div>

    )
}

export default MeetsPage