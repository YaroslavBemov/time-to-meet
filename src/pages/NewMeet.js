import React, { useContext, useState } from 'react'
import Party from '../components/party/Party'
import { MainContext } from '../contexts/MainContext'
import { db } from '../adapters/firebase'
import { useAuth } from '../contexts/AuthContext'

const NewMeet = () => {
  const { party } = useContext(MainContext)
  const { currentUser } = useAuth()
  const name = currentUser.displayName

  const [disabled, setDisabled] = useState(true)
  const [title, setTitle] = useState('')
  const [forParty, setForParty] = useState(() => {
    if (party.length !== 0) {
     return party[0].id
    }
  })

  function handleChangeTitle (e) {
    const { value } = e.target
    value === '' ? setDisabled(true) : setDisabled(false)
    setTitle(value)
  }


  function handleCreateMeet () {
    const docData = {
      title: 'Meet title',
      date: '2021-10-01',
      from: '13',
      to: '18',
      description: 'Test meet',
      owner: name
    }

    console.log(title)
    console.log(forParty)

    db.collection('party')
      .doc(forParty)
      .collection('meets')
      .add(docData)
      .then(() => {
        console.log('Document successfully written!')
      })
  }

  function handleForPartyChange (e) {
    setForParty(e.target.value)
    console.log(forParty)
  }

  return (
    <main>
      <Party/>
      <section className="new-party">
        <h1>New meet</h1>
        <input type="text" value={title} onChange={handleChangeTitle} placeholder="Meet title"/><br/>
        <label>Choose party
          <select value={forParty} onChange={handleForPartyChange}>
            {party.length === 0
            ? <option disabled={true}>No parties</option>
            : party.map(item => (
              <option key={item.id} value={item.id}>{item.title}</option>
              ))}
          </select>
        </label><br/>
        <label>Choose date
          <input type="date"/>
        </label><br/>
        <label>Choose time
          <input type="text"/>
          <input type="text"/>
        </label><br/>
        <label>
          <textarea placeholder="Comment"/>
        </label><br/>
        <button onClick={handleCreateMeet} disabled={disabled}>Create meet</button>
      </section>
    </main>
  )
}

export default NewMeet
