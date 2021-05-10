import React from 'react'
import {useParams} from 'react-router-dom'

const Meet = () => {
    let {id} = useParams()
    return (
        <div>
            <h1>Meet ID={id}</h1>
        </div>
    )
}

export default Meet