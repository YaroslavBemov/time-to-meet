import React, { useContext, useEffect } from 'react'

import { db } from '../../adapters/firebase'
import { useAuth } from '../../contexts/AuthContext'
import { MainContext } from '../../contexts/MainContext'

import styles from './Party.module.sass'
import { ReactComponent as People } from '../../images/people.svg'
import { Link } from 'react-router-dom'
import { NEW_PARTY } from '../../constants/routes'

const Party = () => {
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
    const unsubParty = db
      .collection('party')
      .get()
      .then(documents => {
        // const list = []
        documents.forEach(document => {
          db.collection('party')
            .doc(document.id)
            .collection('members')
            .where('uid', '==', id)
            .onSnapshot(snapshot => {
              const list = snapshot.docs.map(doc => ({
                id: doc.ref.parent.parent.id,
                title: 'title'
              }))

              setParty(list)
              // if (list.length > 0) {
              //   setCurrentParty(list[0].id)
              // }

              // snapshot.docs.forEach((doc) => {
              //
              //   setParty(prev => [...prev, {
              //     id: doc.ref.parent.parent.id,
              //     title: 'title'
              //   }])
              // })
            })
        })

      })

    // return () => {
    //   unsubParty()
    // }
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
