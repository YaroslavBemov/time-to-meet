import {createContext, useContext, useEffect, useState} from 'react'

import {auth} from '../adapters/firebase'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signUpWithEmailAndPassword = (email, password, userName) => {
        return new Promise((resolve, reject) => {
            auth.createUserWithEmailAndPassword(email, password)
                .then(ref => {
                    ref.user.updateProfile({
                        displayName: userName
                    })
                    resolve(ref)
                })
                .catch(error => reject(error))
        })
    }

    const signInWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(email, password)
                .then(ref => resolve(ref))
                .catch(error => reject(error))
        })
    }

    const signOut = () => auth.signOut()

    const resetPassword = (email) => {
        return new Promise((resolve, reject) => {
            auth.sendPasswordResetEmail(email)
                .then(() => resolve(`Password reset send to ${email}`))
                .catch(error => reject(error))
        })
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, [currentUser])

    const value = {
        currentUser,
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
