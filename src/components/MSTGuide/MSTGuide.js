import React from 'react'

import SimpleDisplay from './SimpleDisplay'
import SimpleForm from './SimpleForm'
import ComplexForm from './ComplexForm'

export default function MSTGuide () {
  return (
    <section>
      <h1>MobX State Tree Guide</h1>
      
      <p>This is a breakdown of how we use MST with a React app.</p>
      
      <h2>Setting up the MobX Store</h2>
      
      <p>Looking at the source code of this project, we see there's <code>/src/store/AppStore.js</code> and <code>/src/store/AppContext.js</code></p>
      
      <p>AppStore is a basic MST Store</p>

<div className="example-code">{`
import { types } from 'mobx-state-tree'

const AppStore = types.model('AppStore', {
  player: types.optional(types.string, 'Player 1'),
}).actions(self => {
  return {
    setPlayer (val) {
      self.player = val
    },
  }
})

export { AppStore }

`}</div>
      
      <p>AppContext uses React's Context mechanism to put this data in a "shared space" that can be viewed by any component in your app. (We'll see how a component can connect to the context later.)</p>

<div className="example-code">{`
import { createContext } from 'react'
import { AppStore  } from './AppStore.js'

const defaultContext = AppStore.create({})

const AppContext = createContext(defaultContext)

export default AppContext

`}</div>
      
      <p>MST Stores need to be initialised with default values. Normally, this would be done at the <code>.create()</code> part of the code, e.g. <code>{` AppStore.create({ player: 'Shaun' }) `}</code></p>
      
      <p>For us, we took a shortcut and used <code>types.optional</code> in the AppStore to set a default value.</p>
      
      <p>In turn, the React Context needs a "default context" to understand <i>what shape it needs to be.</i> In our case, if we set that default context to be <i>the MST Store</i>, we'll be able to access that shared instance of the MST Store across the whole app via the context.</p>
      
      <h2>Connecting components to the MobX Store</h2>
      
      <p>We're interested in two things: 1. how to connect a component to the store (using React Context) and 2. how to listen for for changes.</p>
      
      
      
      <p>A simple component (i.e. a <i>function component</i> in React) can use </p>
    
    
<pre>
{`
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
    </div>
  )
}

export default observer(SimpleDisplay)
`}
</pre>
      <SimpleDisplay />
    
      <SimpleForm />
    
      <ComplexForm />
    
    </section>
    
  )
}
