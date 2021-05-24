import React, {useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'

import {MEETS} from '../constants/routes'

const SignIn = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const emailRef = useRef()
    const passwordRef = useRef()

    const history = useHistory()

    const {signInWithEmailAndPassword} = useAuth()

    const handleSignIn = event => {
        event.preventDefault()
        setError('')
        setLoading(true)

        const email = emailRef.current.value
        const password = passwordRef.current.value

        signInWithEmailAndPassword(email, password)
            .then(() => {
                setLoading(false)
                history.push(MEETS)
            })
            .catch(error => {
                setError(error.message)
                setLoading(false)
            })
    }

    return (
        <main>
            <h1>Sign In</h1>
            <form onSubmit={event => handleSignIn(event)}>
                {error}<br/>
                <label>
                    Email
                    <input
                        type='text'
                        ref={emailRef}
                        placeholder='Email'
                        required={true}
                    />
                </label><br/>
                <label>
                    Password
                    <input
                        type='password'
                        ref={passwordRef}
                        placeholder='Password'
                        required={true}
                    />
                </label><br/>
                <button
                    disabled={loading}
                    type='submit'
                >
                    Sign In
                </button>
            </form>
        </main>
    )
}

export default SignIn
