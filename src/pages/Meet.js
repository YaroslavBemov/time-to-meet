import React, {useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'
import {useMeet} from '../contexts/MeetContext'

import compareRange from '../utils/compareRange'

const Meet = () => {
    const {id} = useParams()
    const {currentUser} = useAuth()

    const fromRef = useRef()
    const toRef = useRef()
    const totalRef = useRef({})

    const {document, getDocument, joinToMeet} = useMeet()
    const members = document.members


    // const [total, setTotal] = useState({
    //     from: '...',
    //     to: '...'
    // })

    // const didMount = useRef(false)

    useEffect(() => {
        console.log('Render in MEET')
        getDocument('meets', id)
        console.log(document)
        // if (didMount.current) {
        //     let result = {
        //         from: document.from,
        //         to: document.to
        //     }
        //
        //     if (document.members) {
        //         const count = document.members.length
        //
        //         for (let i = 0; i < count; i++) {
        //             result = compareRange(result, members[i])
        //         }
        //     }
        //
        //     if (+result.from > +result.to) {
        //         [result.from, result.to] = [result.to, result.from]
        //     }

            // setTotal({
            //     from: result.from,
            //     to: result.to
            // })
        // } else {
        //     didMount.current = true
        // }

        return () => {console.log('Render out MEET')}
    }, [])

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
                onClick={handleJoin}
            >Join
            </button>
        </div>

    )
}

export default Meet