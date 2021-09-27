import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../contexts/MainContext'

import styles from './Party.module.sass'
import { ReactComponent as People } from '../../images/people.svg'
import { Link, useHistory } from 'react-router-dom'
import { NEW_PARTY } from '../../constants/routes'

const Party = () => {
  const [listId, setListId] = useState([])
  const [isOwner, setIsOwner] = useState(false)
  const {
    party, getParty, deleteParty,
    currentParty, setCurrentParty,
    setCurrentMeet
  } = useContext(MainContext)
  const history = useHistory()

  const handleChange = e => {
    const { value } = e.target
    setCurrentParty(value)
    setCurrentMeet('')
    history.push('/main')
  }

  function handleAddPartyClick () {

  }

  function handleDelete (e) {
    e.preventDefault()
    const id = e.target.parentNode.firstChild.value
    setCurrentParty('')
    setCurrentMeet('')
    deleteParty(id)
      .then(() => {
      getParty()
    })
  }

  useEffect(() => {
    getParty()
  }, [])

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
              <span
                onClick={handleDelete}
                className={styles.delete}
                // style={isOwner ? {display: 'block'} : {display: 'none'}}
              >
                X
              </span>
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
