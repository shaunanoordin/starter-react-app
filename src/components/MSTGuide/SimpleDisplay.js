import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'

function SimpleDisplay () {
  const store = useContext(AppContext)
  return (
    <div className="form">
      <h2>Player Details</h2>
    
      <fieldset>
        <legend>Name</legend>
        <b>{store.player}</b>
      </fieldset>
    
      <div><a href="https://github.com/shaunanoordin/starter-react-app/blob/master/src/components/MSTGuide/SimpleDisplay.js" target="_blank">[View Source]</a></div>
    </div>
  )
}

export default observer(SimpleDisplay)
