import React, {useContext, useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'

import {useAuth} from '../../contexts/AuthContext'
import {db} from '../../adapters/firebase'
//V9
// import {doc, updateDoc} from 'firebase/firestore'
import firebase from 'firebase/app'
import {MEETS} from '../../constants/routes'
import compareRange from '../../utils/compareRange'
import {MainContext} from '../../contexts/MainContext'

import styles from './Meet.module.sass'
import Scale from '../scale/Scale'

const Meet = () => {
    console.log('MEET')
    const {currentUser} = useAuth()
    const {currentMeet} = useContext(MainContext)
    const [meet, setMeet] = useState([])

    const fromRef = useRef()
    const toRef = useRef()

    const history = useHistory()

    let total = {}
    let members = []
    //TODO fix button
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
                console.log('Document successfully updated!')
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
                console.log('Document successfully deleted!')
                history.push(MEETS)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        if (currentMeet) {
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
        }

    }, [currentMeet])

    const value = {
        from: meet.from,
        to: meet.to,
        total: {
            from: total.from,
            to: total.to
        }
    }

    return (
        <section className="meet">
            <div>
                {/*<h1 className={styles.heading}>{meet && meet.title}</h1>*/}
                <p className={styles.title}>Встречу создал: <span className={styles.text}>{meet && meet.name}</span></p>
                <p className={styles.title}>Комментарий: <span className={styles.text}>{meet && meet.description}</span>
                </p>

                <Scale value={value}/>

                <p>When: <b>{meet && meet.date}</b></p>
                <p>From: <b>{meet && meet.from}</b> To: <b>{meet && meet.to}</b></p>
            </div>
            <div>
                <h3
                    className={styles.h3}
                >Участники голосования</h3>
                {!members
                    ? null
                    : members.map(item => (
                    <Scale
                        key={item.uid}
                        value={{
                            name: item.name,
                            from: item.from,
                            to: item.to,
                            total: {
                                from: total.from,
                                to: total.to
                            }
                        }}
                    />
                ))}
            </div>
            <label>From:
                <input
                    type="text"
                    ref={fromRef}
                />
            </label><br/>
            <label>To:
                <input
                    type="text"
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
        </section>

    )
}

export default Meet
