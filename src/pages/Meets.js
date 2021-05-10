import React from 'react'
import {Link} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'
import {addMeet, useCollection} from '../adapters/meets'

import faker from 'faker'

const Meets = () => {
    const meets = useCollection('meets')
    const {currentUser} = useAuth()

    const handleAdd = () => {
        const uid = currentUser.uid
        const name = currentUser.displayName
        const date = new Date()
        const from = 8
        const to = 20

        addMeet(uid, name, date, from, to)
    }

    return (
        <div>
            <h1>Meets</h1>
            <ul>
                {meets && meets.map(item => (
                    <Link to={'/meets/' + item.id} key={item.id}><li><b>{item.name}</b> {Date(item.date)}</li></Link>
                ))}
            </ul>
            <button onClick={handleAdd}>Add Note</button>
        </div>
    )
}

export default Meets
