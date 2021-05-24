import React from 'react'
import Party from '../components/main/Party'
import Meets from '../components/main/Meets'
import Meet from '../components/main/Meet'

const Main = () => {
    console.log('render main')
    return (
        <>
            <Party/>
            <Meets/>
            <Meet/>
        </>
    )
}

export default Main