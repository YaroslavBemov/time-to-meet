import React, { useState } from 'react'
import Party from '../components/party/Party'

const NewMeet = () => {
  const [title, setTitle] = useState()

  return (
    <main>
      <Party/>
      <section className="new-party">
        <h1>New meet</h1>
        <input type="text" value={title} placeholder="Meet title"/><br/>
        <label>Choose party
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </label><br/>
        <label>Choose date
          <input type="date"/>
        </label><br/>
        <label>Choose time
          <input type='text'/>
          <input type='text'/>
        </label><br/>
        <label>
          <textarea placeholder='Comment'/>
        </label><br/>
        <button>Create meet</button>
      </section>
    </main>
  )
}

export default NewMeet
