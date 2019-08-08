import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'
import { stopEvent } from '@util'

function SimpleForm () {
  const store = useContext(AppContext)
  return (
    <form
      className="form"
      onSubmit={(e) => { return stopEvent(e) }}
    >
      <h2>Edit Player</h2>
    
      <fieldset>
        <legend>Name</legend>
        <input
          type="text"
          defaultValue={store.player}
          onChange={e => store.setPlayer(e.target.value) }
        />
      </fieldset>
    </form>
  )
}

export default observer(SimpleForm)
