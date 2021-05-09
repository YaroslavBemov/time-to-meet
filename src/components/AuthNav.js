import React from 'react'
import {Link} from 'react-router-dom'

import {useAuth} from '../contexts/AuthContext'

import * as ROUTE from '../constants/routes'

const AuthNav = () => {
    const {signOut} = useAuth()

    return (
        <div>
            <Link to={ROUTE.LANDING}>Landing</Link><br/>
            <Link to={ROUTE.MEETS}>Meets</Link><br/>
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    )
}

export default AuthNav