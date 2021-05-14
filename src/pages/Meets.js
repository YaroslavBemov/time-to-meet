import React, {useRef} from 'react'
import {Link} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'
import {addMeet, useCollection} from '../adapters/meets'

const Meets = () => {
    const meets = useCollection('meets')
    const {currentUser} = useAuth()

    const whenRef = useRef()
    const fromRef = useRef()
    const toRef = useRef()

    const handleAdd = () => {
        const uid = currentUser.uid
        const name = currentUser.displayName
        const date = whenRef.current.value
        const from = fromRef.current.value
        const to = toRef.current.value

        addMeet(uid, name, date, from, to)

        fromRef.current.value = ''
        toRef.current.value = ''
    }

    return (
        <div>
            <h1>Meets</h1>
            <ul>
                {meets && meets.map(item => (
                    <Link to={'/meets/' + item.id} key={item.id}><li><b>{item.name}</b> {item.date}</li></Link>
                ))}
            </ul>
            <label>When:
                <input
                    type='date'
                    ref={whenRef}
                />
            </label><br/>
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
            <button onClick={handleAdd}>Add Meet</button>
        </div>
    )
}

export default Meets
