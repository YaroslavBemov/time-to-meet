import React from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'

import * as ROUTE from '../../constants/routes'

import styles from './Nav.module.sass'
import { ReactComponent as Home } from '../../images/home.svg'
import { ReactComponent as People } from '../../images/people.svg'
import { ReactComponent as Logout } from '../../images/logout.svg'
import { ReactComponent as Plus } from '../../images/plus.svg'

const AuthNav = () => {
  const { signOut } = useAuth()
  // const handleClick = () => {}
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link className={styles.link} to={ROUTE.LANDING}>
          <Home className={styles.icon}/>
        </Link>
        <Link className={styles.link} to={ROUTE.MAIN}>
          <People className={styles.icon}/>
        </Link>
      </div>
      <div className={styles.right}>
        <button className={styles.link}
          // onClick={handleClick}
        >
          <Plus className={styles.iconPlus}/>
        </button>
        <button className={styles.link}
                onClick={signOut}
        >
          <Logout className={styles.icon}/>
        </button>
      </div>
    </nav>
  )
}

export default AuthNav
