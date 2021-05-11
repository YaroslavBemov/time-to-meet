import {useEffect, useState} from 'react'

import firebase from 'firebase/app'
import {db} from './firebase'

export function useCollection(title) {
    const [list, setList] = useState([])

    useEffect(() => {
        db.collection(title)
            .onSnapshot(snapshot => {
                const lists = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setList(lists)
            })
    }, [])
    return list
}

export function useDocument(collectionTitle, documentId) {
    const [document, setDocument] = useState([])

    useEffect(() => {
        db.collection(collectionTitle)
            .doc(documentId)
            .onSnapshot(doc => {
                const data = doc.data()
                console.log(data)
                setDocument(data)
            })
    }, [])
    return document
}

export function addMeet(uid, name, date, from, to) {
    db.collection('meets')
        .add({
            uid,
            name,
            date,
            from,
            to
        })
}

export function joinMeet(meetId, uid, name, from, to) {
    db.collection('meets')
        .doc(meetId)
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
            console.log(error.message())
        })
}
