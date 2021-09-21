import React, { useContext, useEffect, useState } from 'react'

import { db } from '../../adapters/firebase'
import { useAuth } from '../../contexts/AuthContext'
import { MainContext } from '../../contexts/MainContext'

import styles from './Party.module.sass'
import { ReactComponent as People } from '../../images/people.svg'
import { Link } from 'react-router-dom'
import { NEW_PARTY } from '../../constants/routes'

const Party = () => {
  const [listId, setListId] = useState([])
  const {
    party, setParty,
    currentParty, setCurrentParty
  } = useContext(MainContext)
  const { currentUser } = useAuth()

  const id = currentUser.uid

  const handleChange = e => {
    const { value } = e.target
    setCurrentParty(value)
  }

  function handleAddPartyClick () {

  }

  useEffect(() => {
    const unsubParty = db.collectionGroup('members')
      .where('uid', '==', id)
      .onSnapshot(snapshot => {
        const list = []
        snapshot.forEach(doc => {
          list.push(doc.ref.parent.parent.id)
        })
        setParty(list)
      })

    return () => {
      unsubParty()
    }
  }, [id])

  return (
    <section className="party">
      <h1 className={styles.heading}>Команды</h1>
      <div className={styles.list}>
        {party.length === 0
          ? <div>No one party.</div>
          : party.map(item => (
            <label className={styles.label}
                   key={item.id}
            >
              <input className={styles.input}
                     type="radio"
                     id={item.title}
                     name="party"
                     value={item.id}
                     checked={currentParty === item.id}
                     onChange={handleChange}
              />
              {item.title}
              <span className={styles.span}>
                   <People className={styles.icon}/>
              </span>
            </label>
          ))}
      </div>
      <Link to={NEW_PARTY}>Create party</Link>
    </section>
  )
}

export default Party
