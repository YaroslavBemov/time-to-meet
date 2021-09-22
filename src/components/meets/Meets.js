import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../adapters/firebase'
import { MainContext } from '../../contexts/MainContext'
import styles from './Meets.module.sass'
import { NEW_MEET, NEW_PARTY } from '../../constants/routes'
import { Link } from 'react-router-dom'

const Meets = () => {
  const [meets, setMeets] = useState([])
  const { currentParty, currentMeet, setCurrentMeet } = useContext(MainContext)

  const handleChange = e => {
    const { value } = e.target
    setCurrentMeet(value)
  }

  useEffect(() => {
    if (currentParty) {
      const unsubMeets = db
        .collection('meets')
        .where('party', '==', currentParty)
        .onSnapshot(snapshot => {
          const list = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          setMeets(list)
          console.log(list[0]?.id)
          setCurrentMeet(list[0]?.id)
        })

      return () => {
        unsubMeets()
      }
    }
  }, [currentParty])

  return (
    <section className="meets">
      <h1 className={styles.heading}>
        Встречи
      </h1>
      <div className={styles.list}>
        {meets.length === 0
          ? <div>No one meet.</div>
          : meets.map(item => (
            <label className={styles.label}
                   key={item.id}
            >
              <input className={styles.input}
                     type="radio"
                     id={item.title}
                     name="meet"
                     value={item.id}
                     checked={currentMeet === item.id}
                     onChange={handleChange}
              />
              {item.title}
              <span className={styles.span}/>
            </label>
          ))}
      </div>
      <Link to={NEW_MEET}>Create meet</Link>
    </section>

  )
}

export default Meets
