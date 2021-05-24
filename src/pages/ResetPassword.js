import React, {useRef, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'

const ResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const {resetPassword} = useAuth()

    const emailRef = useRef()

    const handleResetPassword = event => {
        event.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        const email = emailRef.current.value

        resetPassword(email)
            .then(msg => {
                setMessage(msg)
                setLoading(false)
            })
            .catch(error => {
                setError(error.message)
                setLoading(false)
            })
    }

    return (
        <main>
            <h1>Reset Password</h1>
            <form onSubmit={event => handleResetPassword(event)}>
                {error}<br/>
                {message}<br/>
                <input
                    type='text'
                    ref={emailRef}
                    placeholder='Email'
                    required={true}
                />
                <button
                disabled={loading}
                >Reset Password</button>
            </form>
        </main>
    )
}

export default ResetPassword
