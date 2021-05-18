import React, {useEffect, useRef, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'
import {useMeet} from '../contexts/MeetContext'

import compareRange from '../utils/compareRange'

const Meet = () => {
    const {id} = useParams()
    const {currentUser} = useAuth()

    const fromRef = useRef()
    const toRef = useRef()
    const totalRef = useRef({})
    // const isJoinDisable = useRef(false)

    const {document, getDocument, joinToMeet, deleteDocument} = useMeet()
    const members = document.members

    if (members) {
        let result = {
            from: document.from,
            to: document.to
        }

        if (+result.from > +result.to) {
            [result.from, result.to] = [result.to, result.from]
        }

        const count = members.length

        for (let i = 0; i < count; i++) {
            result = compareRange(result, members[i])
        }

        //TODO don't work!!!
        totalRef.current = {
            from: result.from,
            to: result.to
        }
        //TODO bad way, bug, not updates
        // isJoinDisable.current = !!members.find(member => member.uid === document.uid)
    } else {
        totalRef.current = {
            from: document.from,
            to: document.to
        }
    }

    const handleJoin = () => {
        const meetId = id
        const uid = currentUser.uid
        const name = currentUser.displayName
        const from = fromRef.current.value
        const to = toRef.current.value

        joinToMeet(meetId, uid, name, from, to)

        fromRef.current.value = ''
        toRef.current.value = ''
    }

    useEffect(() => {
        console.log('Render in MEET')
        getDocument('meets', id)

        return () => {
            console.log('Render out MEET')
        }
    }, [])

    return (
        <div>
            <div>
                <h1>ID={id}</h1>
                <p>Who: <b>{document && document.name}</b></p>
                <p>When: <b>{document && document.date}</b></p>
                <p>From: <b>{document && document.from}</b> To: <b>{document && document.to}</b></p>
            </div>
            <div>
                <h3>Members</h3>
                <ul>
                    {members && members.map(item => (
                        <li key={item.uid}>Name: <b>{item.name}</b> from: <b>{item.from}</b> to: <b>{item.to}</b></li>
                    ))}
                </ul>
                <h3>Total</h3>
                <p>From: <b>{totalRef.current.from}</b> To: <b>{totalRef.current.to}</b></p>
            </div>
            <label>From:
                <input
                    type='text'
                    ref={fromRef}
                />
            </label><br/>
            <label>To:
                <input
                    type='text'
                    ref={toRef}
                />
            </label><br/>
            <button
                // disabled={isJoinDisable.current}
                onClick={handleJoin}
            >Join
            </button>
        </div>

    )
}

export default Meet