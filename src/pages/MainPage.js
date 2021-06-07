import React from 'react'
import Party from '../components/Party'
import {MainProvider} from '../contexts/MainContext'
import Meets from '../components/Meets'
import Meet from '../components/Meet'

const MainPage = () => {
    return (
        <MainProvider>
            <Party/>
            <Meets/>
            <Meet/>
        </MainProvider>
    )
}

export default MainPage
