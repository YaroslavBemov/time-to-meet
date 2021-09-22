import {createContext, useState} from 'react'
import { db } from '../adapters/firebase'
import { useAuth } from './AuthContext'

export const MainContext = createContext({})

export function MainProvider({children}) {
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
            const title = doc.data().title
            partyList.push({ id, title })
        }
        setParty(partyList)
    }

    const value = {
        party, setParty, getParty,
        currentParty, setCurrentParty,
        currentMeet, setCurrentMeet
    }

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
}
