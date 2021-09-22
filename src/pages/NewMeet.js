import React, { useContext, useState } from 'react'
import Party from '../components/party/Party'
import { MainContext } from '../contexts/MainContext'
import { db } from '../adapters/firebase'
import { useAuth } from '../contexts/AuthContext'

const NewMeet = () => {
  const { party } = useContext(MainContext)
  const { currentUser } = useAuth()
  const name = currentUser.displayName

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [forParty, setForParty] = useState(() => {
    if (party.length !== 0) {
     return party[0].id
    }
  })
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
      from: '10',
      to: '22',
      description: 'Test meet 3',
      owner: name
    }

    console.log(forParty)
    console.log(title)
    console.log(date)

    // db.collection('party')
    //   .doc(forParty)
    //   .collection('meets')
    //   .add(docData)
    //   .then(() => {
    //     console.log('Document successfully written!')
    //   })
  }

  function handleForPartyChange (e) {
    setForParty(e.target.value)
  }

  function handleDateChange (e) {
    setDate(e.target.value)
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
          <select value={forParty} onChange={handleForPartyChange}>
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
