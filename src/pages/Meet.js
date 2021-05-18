import React, {useEffect, useRef, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'
import {useMeet} from '../contexts/MeetContext'

import compareRange from '../utils/compareRange'

const Meet = () => {
    console.log('MEEEEEEEEEEEET')
    const {id} = useParams()
    const {currentUser} = useAuth()

    const fromRef = useRef()
    const toRef = useRef()

    const {document, getDocument, joinToMeet, deleteDocument} = useMeet()

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

    const didMount = React.useRef(false)

    let members, total, isJoinDisable

    let result = {
        from: document.from,
        to: document.to
    }

    if (+result.from > +result.to) {
        [result.from, result.to] = [result.to, result.from]
    }
    console.log(`result.from = ${result.from}`)
    console.log(`result.to = ${result.to}`)

    if (document.members) {
        members = document.members

        console.log(document.members)
        console.log(members)

        const count = members.length
        console.log(`count = ${count}`)

        for (let i = 0; i < count; i++) {
            result = compareRange(result, members[i])
        }

        //TODO bad way, bug, not updates
        isJoinDisable = !!members.find(member => member.uid === document.uid)
        console.log(`isJoinDisable = ${isJoinDisable}`)
    } else {
        isJoinDisable = false
    }

    //TODO don't work!!!
    total = {
        from: result.from,
        to: result.to
    }

    useEffect(() => {
        console.log('Render in MEET')
        if (didMount.current) {
            console.log('On update')
            console.log(document)



        } else {
            console.log('on first')

            getDocument('meets', id)

            didMount.current = true
        }
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
                <p>From: <b>{total && total.from}</b> To: <b>{total && total.to}</b></p>
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
                disabled={isJoinDisable}
                onClick={handleJoin}
            >Join
            </button>
        </div>

    )
}

export default Meet