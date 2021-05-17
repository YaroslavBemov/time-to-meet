import React from 'react'

import MainNav from './MainNav'
import AuthNav from './AuthNav'

import {useAuth} from '../contexts/AuthContext'

const NavBar = () => {
    const {currentUser} = useAuth()

    return (
        <>
            {!currentUser
                ? <MainNav/>
                : <AuthNav/>}
        </>
    )
}

export default NavBar
