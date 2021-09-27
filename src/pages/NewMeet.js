import React, { useContext, useState } from 'react'
import Party from '../components/party/Party'
import { MainContext } from '../contexts/MainContext'
import { db } from '../adapters/firebase'
import { useAuth } from '../contexts/AuthContext'

const NewMeet = () => {
  const { party, createMeet } = useContext(MainContext)
  const { currentUser } = useAuth()
  const name = currentUser.displayName

  const [partyId, setPartyId] = useState(() => {
    if (party.length !== 0) {
     return party[0].id
    }
  })
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [disabled, setDisabled] = useState(true)

  function handleChangeTitle (e) {
    const { value } = e.target
    value === '' ? setDisabled(true) : setDisabled(false)
    setTitle(value)
  }


  function handleCreateMeet () {
    const docData = {
      title,
      date,
      from,
      to,
      description,
      owner: name
    }
    createMeet(partyId, docData)
  }

  function handleForPartyChange (e) {
    setPartyId(e.target.value)
  }

  function handleDateChange (e) {
    setDate(e.target.value)
  }

  function handleChangeDesc (e) {
    setDescription(e.target.value)
  }

  function handleChangeFrom (e) {
    setFrom(e.target.value)
  }

  function handleChangeTo (e) {
    setTo(e.target.value)
  }

  return (
    <main>
      <Party/>
      <section className="new-party">
        <h1>New meet</h1>
        <input type="text"
               value={title}
               onChange={handleChangeTitle}
               placeholder="Meet title"/><br/>
        <label>Choose party
          <select value={partyId} onChange={handleForPartyChange}>
            {party.length === 0
            ? <option disabled={true}>No parties</option>
            : party.map(item => (
              <option key={item.id} value={item.id}>{item.title}</option>
              ))}
          </select>
        </label><br/>
        <label>Choose date
          <input type="date"
          value={date}
          onChange={handleDateChange}/>
        </label><br/>
        <label>Choose time
          <input
            value={from}
            onChange={handleChangeFrom}
            type="text"/>
          <input
            value={to}
            onChange={handleChangeTo}
            type="text"/>
        </label><br/>
        <label>
          <textarea
            value={description}
            onChange={handleChangeDesc}
            placeholder="Comment"/>
        </label><br/>
        <button onClick={handleCreateMeet} disabled={disabled}>Create meet</button>
      </section>
    </main>
  )
}

export default NewMeet
