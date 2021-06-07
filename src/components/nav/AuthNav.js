import React from 'react'
import {Link} from 'react-router-dom'

import {useAuth} from '../../contexts/AuthContext'

import * as ROUTE from '../../constants/routes'

const AuthNav = () => {
    const {signOut} = useAuth()

    return (
        <nav>
            <Link to={ROUTE.LANDING}>Landing</Link><br/>
            <Link to={ROUTE.MAIN}>APP</Link><br/>
            <button onClick={() => signOut()}>Sign Out</button>
        </nav>
    )
}

export default AuthNav