import React, {useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'
import {db} from '../adapters/firebase'
import {MEETS} from '../constants/routes'


const Meets = () => {
    const [meets, setMeets] = useState([])
    const whenRef = useRef()
    const fromRef = useRef()
    const toRef = useRef()
    const {currentUser} = useAuth()


    const addMeet = () => {
        const uid = currentUser.uid
        const name = currentUser.displayName
        const date = whenRef.current.value
        const from = fromRef.current.value
        const to = toRef.current.value

        db.collection('meets')
            .add({uid, name, date, from, to})
            .then(() => {
                console.log("Document successfully created!")
            })
            .catch(error => {
                console.log(error.message)
            })

        fromRef.current.value = ''
        toRef.current.value = ''
    }

    useEffect(() => {
        const unsubscribeMeets = db
            .collection('meets')
            .onSnapshot(snapshot => {
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setMeets(list)
            })

        return () => {
            unsubscribeMeets()
        }
    }, [])

    return (
        <div>
            <h1>Meets</h1>
            <ul>
                {meets && meets.map(item => (
                    <li key={item.id}>
                        <Link to={`${MEETS}/${item.id}`}>
                            <b>{item.name}</b> {item.date}</Link>
                    </li>
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
            <button onClick={addMeet}>Add Meet</button>
        </div>
    )
}

export default Meets
