import { createContext, useState } from 'react'
import { db } from '../adapters/firebase'
import { useAuth } from './AuthContext'
import { MEETS } from '../constants/routes'
import firebase from 'firebase'

export const MainContext = createContext({})

export function MainProvider ({ children }) {
  const [party, setParty] = useState([])
  const [meets, setMeets] = useState([])
  const [meet, setMeet] = useState({})
  const [currentParty, setCurrentParty] = useState('')
  const [currentMeet, setCurrentMeet] = useState('')

  const { currentUser } = useAuth()
  const id = currentUser.uid
  const name = currentUser.displayName

  const getParty = async () => {
    const documents = await db.collectionGroup('members')
      .where('uid', '==', id)
      .get()

    const partyList = []
    for (let i = 0; i < documents.docs.length; i++) {
      const doc = await documents.docs[i].ref.parent.parent.get()
      const id = documents.docs[i].ref.parent.parent.id
      // console.log('Party ID: ' + id)
      const title = await doc.data().title
      // console.log('Party title: ' + title)
      partyList.push({ id, title })
    }
    setParty(partyList)
  }

  const createParty = async (uid, name, title) => {
    const docData = {
      title,
      owner: {
        uid,
        name
      }
    }

    await db.collection('party')
      .add(docData)
      .then(res => {
        db.collection('party')
          .doc(res.id)
          .collection('members')
          .add({ uid, name })
      })
  }

  const deleteParty = async (id) => {
    const members = await db.collection('party')
      .doc(id)
      .collection('members')
      .get()

    for (let i = 0; i < members.docs.length; i++) {
      console.log(members.docs[i].id)
      await db.collection('party')
        .doc(id)
        .collection('members')
        .doc(`${members.docs[i].id}`)
        .delete()
        .then(() => {
          console.log('Document successfully deleted! ' + members.docs[i].id)
        })
        .catch((error) => {
          console.error('Error removing document: ', error)
        })
    }

    const meets = await db.collection('party')
      .doc(id)
      .collection('meets')
      .get()

    for (let i = 0; i < meets.docs.length; i++) {
      await db.collection('party')
        .doc(id)
        .collection('meets')
        .doc(`${meets.docs[i]}`)
        .delete()
        .then(() => {
          console.log('Document successfully deleted! ' + meets.docs[i].id)
        })
        .catch((error) => {
          console.error('Error removing document: ', error)
        })
    }

    await db.collection('party')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted! ' + id)
      })
      .catch((error) => {
        console.error('Error removing document: ', error)
      })
  }

  const createMeet = async (partyId, docData) => {
    await db.collection('party')
      .doc(partyId)
      .collection('meets')
      .add(docData)
      .then((docRef) => {
        setCurrentMeet(docRef.id)
      })
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error written document: ', error)
      })
  }

  const getMeets = async () => {
    if (currentParty !== '') {
      await db.collection('party')
        .doc(currentParty)
        .collection('meets')
        .onSnapshot(snapshot => {
          let list = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          setMeets(list)
          if (currentMeet === '' && list.length > 0) {
            setCurrentMeet(list[0]?.id)
          }
        })
    }
  }

  const getMeet = async () => {
    if (currentMeet !== '') {
      const documents = await db.collection('party')
        .doc(currentParty)
        .collection('meets')
        .get()

      const document = documents.docs.filter(it => it.id === currentMeet)
      const data = await document[0].data()
      setMeet(data)
    }
  }

  const deleteMeet = (id) => {
    db.collection('party')
      .doc(currentParty)
      .collection('meets')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted! ' + id)
      })
      .catch((error) => {
        console.error('Error removing document: ', error)
      })
  }

  const joinMeet = async (from, to) => {
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

   await db.collection('party')
      .doc(currentParty)
      .collection('meets')
      .doc(currentMeet)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion({
          uid: id,
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
  }

  const value = {
    party, getParty, createParty, deleteParty,
    meets, getMeets,
    meet, getMeet, createMeet, joinMeet, deleteMeet,
    currentParty, setCurrentParty,
    currentMeet, setCurrentMeet
  }

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
}
