import { createContext, useState } from 'react'
import { db } from '../adapters/firebase'
import { useAuth } from './AuthContext'

export const MainContext = createContext({})

export function MainProvider ({ children }) {
  const [party, setParty] = useState([])
  const [currentParty, setCurrentParty] = useState('')
  const [currentMeet, setCurrentMeet] = useState('')

  const { currentUser } = useAuth()
  const id = currentUser.uid

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
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error written document: ', error)
      })
  }

  const value = {
    party, setParty, getParty, deleteParty,
    currentParty, setCurrentParty,
    currentMeet, setCurrentMeet, createMeet
  }

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
}
