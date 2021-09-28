import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../adapters/firebase'
//V9
// import {doc, updateDoc} from 'firebase/firestore'
import firebase from 'firebase/app'
import { MEETS } from '../../constants/routes'
import compareRange from '../../utils/compareRange'
import { MainContext } from '../../contexts/MainContext'

import styles from './Meet.module.sass'
import Scale from '../scale/Scale'

const Meet = () => {
  const { currentUser } = useAuth()
  const { currentMeet, currentParty, meet, getMeet, joinMeet, setCurrentMeet, deleteMeet } = useContext(MainContext)
  // const [meet, setMeet] = useState([])

  const fromRef = useRef()
  const toRef = useRef()

  const history = useHistory()

  let total = {}
  let members = []
  //TODO fix button
  let isJoinDisable = false
  // console.log(`isJoinDisable = ${isJoinDisable}`)
  let isDeleteDisable = true

  if (meet) {
    total = {
      from: meet.from,
      to: meet.to
    }

    if (+total.from > +total.to) {
      [total.from, total.to] = [total.to, total.from]
    }

    isDeleteDisable = meet.uid !== currentUser.uid

    if (meet.members) {
      members = meet.members
      const count = members.length

      for (let i = 0; i < count; i++) {
        total = compareRange(total, members[i])
      }

      isJoinDisable = !!members.find(member => member.uid === meet.uid)
      console.log(`isJoinDisable = ${isJoinDisable}`)
    }
  }

  const selectHandleFrom = (e) => {
    fromRef.current.value = e.target.value
    console.log(fromRef.current.value)
  }

  const selectHandleTo = (e) => {
    toRef.current.value = e.target.value
    console.log(toRef.current.value)
  }

  useEffect(() => {
    getMeet()
  }, [currentMeet])

  const value = {
    from: meet.from,
    to: meet.to,
    total: {
      from: total.from,
      to: total.to
    }
  }

  let optionsFrom = [],
    optionsTo = []

  for (let i = meet.from; i < meet.to; i++) {
    optionsFrom.push({
      value: i,
      label: `${i}:00`
    })
  }

  for (let i = +meet.from + 1; i <= meet.to; i++) {
    optionsTo.push({
      value: i,
      label: `${i}:00`
    })
  }

  function handleDelete () {
    setCurrentMeet('')
    deleteMeet(currentMeet)
  }

  function handleJoinMeet () {
    const from = fromRef.current.value
    const to = toRef.current.value

    joinMeet(from, to)

    fromRef.current.value = ''
    toRef.current.value = ''
  }

  return (
    <section className="meet">
      {currentMeet === '' || currentMeet === undefined
        ? <div>No details.</div>
        : <>
          <div>
            <p className={styles.title}>
              Встречу создал: <span
              className={styles.text}>{meet && meet.owner}</span>
              <span
                onClick={handleDelete}
                className={styles.delete}
                // style={isOwner ? {display: 'block'} : {display: 'none'}}
              >
                X
              </span>
            </p>
            <p className={styles.title}>
              Когда: <span className={styles.text}>{meet && meet.date}</span>
            </p>
            <p className={styles.title}>
              Комментарий: <span
              className={styles.text}>{meet && meet.description}</span>
            </p>

            <Scale value={value}/>

            <div className={styles.join}
                 style={{ display: isJoinDisable ? 'none' : 'flex' }}
            >
              <span>Ваш голос:</span>
              <span>с</span>
              <select className={styles.select}
                      ref={fromRef}
                      onChange={selectHandleFrom}
              >
                {optionsFrom.map(option => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
              <span>по</span>
              <select className={styles.select}
                      ref={toRef}
                      onChange={selectHandleTo}
              >
                {optionsTo.map(option => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
              <button className={styles.vote}
                      onClick={handleJoinMeet}
                      disabled={isJoinDisable}
              >
                Голосовать
              </button>
            </div>

          </div>
          <div>
            <h3 className={styles.h3}>
              Участники голосования
            </h3>
            {!members
              ? null
              : members.map(item => (
                <Scale
                  key={item.uid}
                  value={{
                    name: item.name,
                    from: meet.from,
                    to: meet.to,
                    total: {
                      from: item.from,
                      to: item.to
                    }
                  }}
                />
              ))}
          </div>
        </>
      }
    </section>

  )
}

export default Meet
