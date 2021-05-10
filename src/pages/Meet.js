import React from 'react'
import {useParams} from 'react-router-dom'

import {useDocument, joinMeet} from '../adapters/meets'
import {useAuth} from '../contexts/AuthContext'

const Meet = () => {
    const {currentUser} = useAuth()
    const {id} = useParams()
    const document = useDocument('meets', id)
    const members = document.members

    const handleJoin = () => {
        const meetId = id
        const uid = currentUser.uid
        const name = currentUser.displayName
        const from = 10
        const to = 19

        joinMeet(meetId, uid, name, from, to)
    }

    return (
        <div>
            <div>
                <h1>ID={id}</h1>
                <p>{document.name}</p>
                <p>{Date(document.date)}</p>
                <p>From: {document.from}</p>
                <p>To: {document.to}</p>
            </div>
            <div>
                <h2>Members</h2>
                <ul>
                {members && members.map(item => (
                    <li key={item.uid}>Name: {item.name} from: {item.from} to: {item.to}</li>
                ))}
                </ul>
            </div>
            <button
            // disabled={currentUser.uid === document.uid}
                onClick={handleJoin}
            >Join</button>
        </div>

    )
}

export default Meet