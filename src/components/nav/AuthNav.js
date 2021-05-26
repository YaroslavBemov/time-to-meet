import React from 'react'
import {Link} from 'react-router-dom'

import {useAuth} from '../../contexts/AuthContext'

import * as ROUTE from '../../constants/routes'

const AuthNav = () => {
    const {signOut} = useAuth()

    return (
        <>
            <Link to={ROUTE.LANDING}>Landing</Link><br/>
            <Link to={ROUTE.PARTY}>Party</Link><br/>
            <Link to={ROUTE.MAIN}>Main</Link><br/>
            <Link to={ROUTE.MEETS}>Meets</Link><br/>
            <button onClick={() => signOut()}>Sign Out</button>
        </>
    )
}

export default AuthNav