import {createContext, useState} from 'react'

export const MainContext = createContext({})

export function MainProvider({children}) {
    const [party, setParty] = useState([])
    const [currentParty, setCurrentParty] = useState('')
    const [currentMeet, setCurrentMeet] = useState('')

    const value = {
        party, setParty,
        currentParty, setCurrentParty,
        currentMeet, setCurrentMeet
    }

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
}