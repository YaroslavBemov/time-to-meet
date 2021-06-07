import React from 'react'
import {Link} from 'react-router-dom'

import {useAuth} from '../../contexts/AuthContext'

import * as ROUTE from '../../constants/routes'

import styles from './Nav.module.sass'
import {ReactComponent as Home} from '../../images/home.svg'
import {ReactComponent as People} from '../../images/people.svg'
import {ReactComponent as Logout} from '../../images/logout.svg'

const AuthNav = () => {
    const {signOut} = useAuth()

    return (
        <nav className={styles.nav}>
            <Link
                className={styles.link}
                to={ROUTE.LANDING}
            >
                <Home className={styles.icon}/>
            </Link>
            <Link
                className={styles.link}
                to={ROUTE.MAIN}
            >
                <People className={styles.icon}/>
            </Link>
            <button
                className={styles.link}
                onClick={signOut}
            >
                <Logout className={styles.icon}/>
            </button>
        </nav>
    )
}

export default AuthNav