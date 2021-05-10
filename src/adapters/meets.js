import {useEffect, useState} from 'react'

import {db} from './firebase'

export function useAllMeets() {
    const [meets, setMeets] = useState([])

    useEffect(() => {
        db.collection('meets')
            .onSnapshot(snapshot => {
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setMeets(list)
            })
    }, [])
    return meets
}

export function addNote(uid, name, date, from, to) {
    db.collection('meets')
        .add({
            uid,
            name,
            date,
            from,
            to
        })
}