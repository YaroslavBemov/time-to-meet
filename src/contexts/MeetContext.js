import {createContext, useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

import {db} from '../adapters/firebase'
import firebase from 'firebase'
import {MEETS} from '../constants/routes'

const MeetContext = createContext()

export function useMeet() {
    return useContext(MeetContext)
}

export function MeetProvider({children}) {
    const [collection, setCollection] = useState([])
    const [document, setDocument] = useState([])
    const history = useHistory()

    // TODO unsubscribe
    const getCollection = (title) => {
        db.collection(title)
            .onSnapshot(snapshot => {
                let list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setCollection(list)
            })
    }

    // TODO unsubscribe
    const getDocument = (collectionTitle, documentId) => {
        db.collection(collectionTitle)
            .doc(documentId)
            .onSnapshot(doc => {
                const data = doc.data()
                setDocument(data)
            })
    }

    const addDocument = (collectionTitle, uid, name, date, from, to) => {
        db.collection(collectionTitle)
            .add({uid, name, date, from, to})
            .then(() => {
                console.log("Document successfully created!")
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const deleteDocument = (collectionTitle, documentId) => {
        db.collection(collectionTitle)
            .doc(documentId)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!")
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const joinToMeet = (meetId, uid, name, from, to) => {
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
                console.log(error.message)
            })
    }

    useEffect(() => {
        console.log('Render in MeetsContext')

        return () => {
            console.log('Render out MeetsContext')
        }
    }, [])

    const value = {
        collection,
        document,
        getCollection,
        getDocument,
        addDocument,
        deleteDocument,
        joinToMeet
    }

    return (
        <MeetContext.Provider value={value}>
            {children}
        </MeetContext.Provider>
    )
}
