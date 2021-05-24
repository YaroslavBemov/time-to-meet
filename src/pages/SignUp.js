import React, {useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'

import {MEETS} from '../constants/routes'

const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const emailRef = useRef()
    const passwordRef = useRef()
    const userNameRef = useRef()

    const history = useHistory()

    const {signUpWithEmailAndPassword} = useAuth()

    const handleSignUp = event => {
        event.preventDefault()
        setError('')
        setLoading(true)

        const email = emailRef.current.value
        const password = passwordRef.current.value
        const userName = userNameRef.current.value

        signUpWithEmailAndPassword(email, password, userName)
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
            <h1>Sign Up</h1>
            <form onSubmit={event => handleSignUp(event)}>
                {error}<br/>
                <label>
                    Name
                    <input
                        type='text'
                        ref={userNameRef}
                        placeholder='Name'
                        required={true}
                    />
                </label><br/>
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
                    Sign Up
                </button>
            </form>
        </main>
    )
}

export default SignUp
