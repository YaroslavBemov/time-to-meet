import React from 'react'

import { db } from '../../adapters/firebase'
import { useAuth } from '../../contexts/AuthContext'

const Playground = () => {
  function handleClick() {
    db.collection('party')
      // .doc('EcIKtQ2CMW276G0INlFB')
      .where('uids', 'array-contains', 'H85ix1oK7Zf34yLignglYJnKwLd2')
      // .collection('members')
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot.docs)
        // let party = []
        querySnapshot.forEach((doc) => {
          console.log(doc.id)
          db.collection('party')
            .doc(doc.id)
            .collection('members')
            .onSnapshot((snapshot => {
              // console.log(snapshot)
              snapshot.forEach((member) => {
                console.log(member.data())
              })
            }))
          // console.log(doc.id)
          // party.push(doc.data())
        })
        // console.log('Current parties: ', party.join(', '))
      }, (error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <button
        onClick={handleClick}
      >Click
      </button>

    </div>
  )
}

export default Playground
