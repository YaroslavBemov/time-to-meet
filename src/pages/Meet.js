import React from 'react'
import {useParams} from 'react-router-dom'

import {useDocument} from '../adapters/meets'

const Meet = () => {
    const {id} = useParams()
    const document = useDocument('meets', id)

    return (
        <div>
            <h1>ID={id}</h1>
            <p>{document.name}</p>
            <p>{Date(document.date)}</p>
            <p>From: {document.from}</p>
            <p>To: {document.to}</p>
        </div>
    )
}

export default Meet