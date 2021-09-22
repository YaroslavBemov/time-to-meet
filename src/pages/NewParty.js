import React, { useContext, useState } from 'react'
import Party from '../components/party/Party'
import { db } from '../adapters/firebase'
import { useAuth } from '../contexts/AuthContext'
import { MainContext } from '../contexts/MainContext'

const NewParty = () => {
  const [title, setTitle] = useState('')
  const [disabled, setDisabled] = useState(true)

  const {
    party, setParty, getParty,
    currentParty, setCurrentParty
  } = useContext(MainContext)

  const { currentUser } = useAuth()
  const name = currentUser.displayName
  const uid = currentUser.uid

  function handleChangeTitle (e) {
    const { value } = e.target
    value === '' ? setDisabled(true) : setDisabled(false)
    setTitle(value)
  }

  function handleCreateParty () {
    const docData = {
      title,
      owner: {
        uid,
        name
      }
    }
    db.collection('party')
      .add(docData)
      .then(res => {
        db.collection('party')
          .doc(res.id)
          .collection('members')
          .add({ uid, name })
          .then(() => {
            getParty()
          })
      })
  }

  return (
    <main>
      <Party/>
      <section className="new-party">
        <h1>New party</h1>
        <input type="text" value={title} onChange={handleChangeTitle}/><br/>
        <button onClick={handleCreateParty} disabled={disabled}>Create party
        </button>
      </section>
    </main>
  )
}

export default NewParty
