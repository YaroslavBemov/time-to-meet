import React from 'react'
import {Link} from 'react-router-dom'

import * as ROUTE from '../../constants/routes'

const MainNav = () => {

    return (
        <>
            <Link to={ROUTE.LANDING}>Landing</Link><br/>
            <Link to={ROUTE.SIGNUP}>Sign Up</Link><br/>
            <Link to={ROUTE.SIGNIN}>Sign In</Link><br/>
            <Link to={ROUTE.RESET_PASSWORD}>Reset Password</Link><br/>
        </>
    )
}

export default MainNav
