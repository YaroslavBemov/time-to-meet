import React, {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'
import {useMeet} from '../contexts/MeetContext'


const Meets = () => {
    const {collection, getCollection, addDocument} = useMeet()

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

        addDocument('meets', uid, name, date, from, to)

        fromRef.current.value = ''
        toRef.current.value = ''
    }

    useEffect(() => {
        console.log('Render in Meets')
        getCollection('meets')

        return () => {console.log('Render out Meets')}
    }, [])

    return (
        <div>
            <h1>Meets</h1>
            <ul>
                {collection && collection.map(item => (
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
