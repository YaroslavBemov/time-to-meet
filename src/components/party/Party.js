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
    const unsubParty = db
      .collection('party')
      .get()
      .then(documents => {
        documents.forEach(document => {
          db.collection('party')
            .doc(document.id)
            .collection('members')
            .where('uid', '==', id)
            .get()
            .then(data => {
              if (data.docs.length > 0) {
                setListId(prevState => [...prevState, data.docs[0].id])
              }
            })
        })
      })
      .then(() => {
        if (listId.length > 0){
          listId.forEach(id => {
            console.log(id)
            db.collection('party')
              .doc(id)
              .get()
              .then((data) => {
                console.log(data.data())
                setParty(prev => [...prev, {
                  id: id,
                  // title: data.data().title
                }])
              })
          })
        }
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
