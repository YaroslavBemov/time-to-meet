import React, {useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'

import {useDocument, joinMeet} from '../adapters/meets'
import {useAuth} from '../contexts/AuthContext'

import compareRange from '../utils/compareRange'

const Meet = () => {
    const {currentUser} = useAuth()
    const {id} = useParams()
    const document = useDocument('meets', id)
    const members = document.members

    const fromRef = useRef()
    const toRef = useRef()

    const [total, setTotal] = useState({
        from: '...',
        to: '...'
    })

    const didMount = useRef(false)

    useEffect(() => {
        if (didMount.current) {
            let result = {
                from: document.from,
                to: document.to
            }

            if (document.members) {
                const count = document.members.length

                for (let i = 0; i < count; i++) {
                    result = compareRange(result, members[i])
                }
            }

            if (+result.from > +result.to) {
                [result.from, result.to] = [result.to, result.from]
            }

            setTotal({
                from: result.from,
                to: result.to
            })
        } else {
            didMount.current = true
        }
    }, [document])

    const handleJoin = () => {
        const meetId = id
        const uid = currentUser.uid
        const name = currentUser.displayName
        const from = fromRef.current.value
        const to = toRef.current.value

        joinMeet(meetId, uid, name, from, to)

        fromRef.current.value = ''
        toRef.current.value = ''
    }

    return (
        <div>
            <div>
                <h1>ID={id}</h1>
                <p>Who: <b>{document.name}</b></p>
                <p>When: <b>{document.date}</b></p>
                <p>From: <b>{document.from}</b> To: <b>{document.to}</b></p>
            </div>
            <div>
                <h3>Members</h3>
                <ul>
                    {members && members.map(item => (
                        <li key={item.uid}>Name: {item.name} from: <b>{item.from}</b> to: <b>{item.to}</b></li>
                    ))}
                </ul>
                <h3>Total</h3>
                <p>From: <b>{total.from}</b> To: <b>{total.to}</b></p>
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
                // disabled={currentUser.uid === document.uid}
                onClick={handleJoin}
            >Join
            </button>
        </div>

    )
}

export default Meet