import React, {useEffect, useRef, useState} from 'react'
import {useParams, useHistory, useRouteMatch} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'
import {db} from '../adapters/firebase'
//V9
// import {doc, updateDoc} from 'firebase/firestore'
import firebase from 'firebase/app'
import {MEETS} from '../constants/routes'
import compareRange from '../utils/compareRange'

const Meet = ({currentMeet}) => {
    // const {id} = useParams()
    // const match = useRouteMatch()
    // const id = match.params.meet
    const {currentUser} = useAuth()

    const [meet, setMeet] = useState([])

    const fromRef = useRef()
    const toRef = useRef()

    const history = useHistory()

    let total = {}
    let members = []
    let isJoinDisable = false
    let isDeleteDisable = true

    if (meet) {
        total = {
            from: meet.from,
            to: meet.to
        }

        if (+total.from > +total.to) {
            [total.from, total.to] = [total.to, total.from]
        }

        isDeleteDisable = meet.uid !== currentUser.uid

        if (meet.members) {
            members = meet.members
            const count = members.length

            for (let i = 0; i < count; i++) {
                total = compareRange(total, members[i])
            }

            isJoinDisable = !!members.find(member => member.uid === meet.uid)
        }
    }

    const joinMeet = () => {
        const uid = currentUser.uid
        const name = currentUser.displayName
        const from = fromRef.current.value
        const to = toRef.current.value

        //V9
        // const meetRef = doc(db, 'meets', id);
        //
        // await updateDoc(meetRef, {
        //     members: arrayUnion({
        //         uid: uid,
        //         name: name,
        //         from: from,
        //         to: to
        //     })
        // })

        db.collection('meets')
            .doc(currentMeet)
            .update({
                members: firebase.firestore.FieldValue.arrayUnion({
                    uid: uid,
                    name: name,
                    from: from,
                    to: to
                })
            })
            .then(() => {
                console.log("Document successfully updated!")
            })
            .catch(error => {
                console.log(error.message)
            })

        fromRef.current.value = ''
        toRef.current.value = ''
    }

    const deleteMeet = () => {
        db.collection('meets')
            .doc(currentMeet)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!")
                history.push(MEETS)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        const unsubscribeMeet = db
            .collection('meets')
            .doc(currentMeet)
            .onSnapshot(doc => {
                const data = doc.data()
                setMeet(data)
            })

        return () => {
            unsubscribeMeet()
        }
    }, [currentMeet])

    return (
        <div>
            <div>
                <h1>ID={currentMeet}</h1>
                <p>Who: <b>{meet && meet.name}</b></p>
                <p>When: <b>{meet && meet.date}</b></p>
                <p>From: <b>{meet && meet.from}</b> To: <b>{meet && meet.to}</b></p>
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
                onClick={joinMeet}
            >Join
            </button>
            <button
                disabled={isDeleteDisable}
                onClick={deleteMeet}
            >Delete
            </button>
        </div>

    )
}

export default Meet
