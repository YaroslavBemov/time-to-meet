import React, {memo} from 'react'
import Meets from './Meets'
import Meet from './Meet'

const Party = memo(() => {
    console.log('render party')
    return (
        <>
        <section className='party'>
            <h1>Party</h1>
        </section>
        </>
    )
})

export default Party