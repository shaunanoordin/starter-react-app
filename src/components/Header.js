import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import AppContext from '@store'

function Header() {
  const store = useContext(AppContext)
  return (
    <header>
      <h1>Starter React App</h1>
      <h2>Hello, {store.player}</h2>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  )
}

export default observer(Header)
