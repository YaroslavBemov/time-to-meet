import React from 'react'
import Party from '../components/party/Party'
import {MainProvider} from '../contexts/MainContext'
import Meets from '../components/Meets'
import Meet from '../components/Meet'

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
