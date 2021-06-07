import React from 'react'
import Party from '../components/party/Party'
import {MainProvider} from '../contexts/MainContext'
import Meets from '../components/meets/Meets'
import Meet from '../components/meet/Meet'

const MainPage = () => {
    return (
        <MainProvider>
            <main>
                <Party/>
                <Meets/>
                <Meet/>
            </main>
        </MainProvider>
    )
}

export default MainPage
