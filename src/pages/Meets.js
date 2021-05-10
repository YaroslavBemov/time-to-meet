import React from 'react'

import {addNote, useAllMeets} from '../adapters/meets'

import faker from 'faker'
import {useAuth} from "../contexts/AuthContext";
import {Link} from "react-router-dom";

const Meets = () => {
    const meets = useAllMeets()
    const {currentUser} = useAuth()

    const handleAdd = () => {
        const uid = currentUser.uid
        const name = currentUser.displayName
        const date = new Date()
        const from = 9
        const to = 19

        addNote(uid, name, date, from, to)
    }

    return (
        <div>
            <h1>Meets</h1>
            <ul>
                {meets && meets.map(item => (
                    <Link to={'/meets/' + item.id} key={item.id}><li><b>{item.name}</b> {Date(item.date)}</li></Link>
                ))}
            </ul>
            <button onClick={() => handleAdd()}>Add Note</button>
        </div>
    )
}

export default Meets
