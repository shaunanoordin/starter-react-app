import React from 'react'

import SimpleDisplay from './SimpleDisplay'
import SimpleForm from './SimpleForm'
import ComplexForm from './ComplexForm'

export default function MSTGuide () {
  return (
    <article>
      <h1>MobX State Tree Guide</h1>
      
      <p>This is a breakdown of how we use MST with a React app.</p>
      
      
      <section>
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

      </section>
      
      <section>
        
        <h2>Connecting components to the MobX Store</h2>

        <p>We're interested in two things: 1. how to connect a component to the store (using React Context) and 2. how to listen for for changes.</p>

        <p>A simple component (i.e. a <i>function component</i> in React) can use <code>useContext</code> to connect to the MST Store. For example, <code>const store = useContext(AppContext)</code> is all you need to access the store.</p>

        <p>To make sure the component <i>listens for changes to the store</i>, we wrap it in an <code>observer</code> from <code>mobx-react</code>.</p>
    
<div className="example-code">{`
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

`}</div>
        
        <p>Below, you'll see a demo of a <code>SimpleDisplay</code> that simply pulls and observes values from a store, and a <code>SimpleForm</code> that does the same, <i>plus</i> it lets you write back to the store using <code>store.setPlayer()</code>. You know, just to prove that the first component is observing the store properly.</p>
      
        <div className="demo">
          <SimpleDisplay />

          <SimpleForm />
        </div>
      </section>
      
      <section>
        <h2>Creating more interesting MobX Stores</h2>
        
        <p>Check out <code>/src/store/CharacterSheetStore.js</code> for most of the code we talk about here.</p>
        
        <p>1. An MST Store can have another MST Store as its child, as long as <i>you remember to initialise the store.</i> One way to do this is to provide an empty object, which sets the default value of the sub-store to be an... empty object.</p>

<div className="example-code">{`
const AppStore = types.model('AppStore', {
  characterSheet: types.optional(CharacterSheetStore, {}),
})

`}</div>
        
        <p>Another way, which is used by the main Zooniverse monorepo and may in truth be the better option, is to initialise the Store by passing in a function that returns <code>MyStore.create()</code>.</p>
        
<div className="example-code">{`
const AppStore = types.model('AppStore', {
  characterSheet: types.optional(CharacterSheetStore, () => CharacterSheetStore.create({})),
})

`}</div>
        
        <p>2. You can use <code>types.frozen({})</code> for arbitrary (but non-changing) data stored as objects. For example, results from an API.</p>
        
        <p>3. <code>getRoot()</code> lets you access the root store (in our case, AppStore), which is helpful if your store's actions require the data state of different stores to perform a function.</p>
        
        <p>Both </p>

<div className="example-code">{`
import { types, getRoot } from 'mobx-state-tree'

const CharacterSheetStore = types.model('CharacterSheetStore', {
  
  job: types.optional(types.string, 'Fighter'),
  description: types.optional(types.string, 'No description set'),
  
}).actions(self => {
  return {
    
    generateDescription () {
      const root = getRoot(self)
      self.description = root.player + ' works as a ' + self.job
    }
  }
})

export { CharacterSheetStore }

`}</div>
        
      </section>
      
      <section>
        <h2>Using full React Components</h2>
        
        <p>When using simple (functional) React components isn't enough, and you need to use a full-blown <code>React.Component</code> with full state/lifecycle/etc functionality, there's an even simpler way to connect it to the context where your MST store resides. You don't use <code>useContext()</code>, but instead simply use <code>MyComponent.contextType = AppContext</code>, which lets you connect to your store by using <code>const store = this.context</code> or <code>const subStore = this.context.subStore</code>.</p>
        
        <p>(Don't forget that you still need that <code>observer</code> though.)</p>

<div className="example-code">{`
import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'

class ComplexForm extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const characterSheet = this.context.characterSheet
    
    return (
      ...
    )
  }
}

ComplexForm.contextType = AppContext

export default observer(ComplexForm)

`}</div>

        <p>Below, you'll see a demo of a <code>ComplexForm</code> in action.</p>
        
        <div className="demo">
          <ComplexForm />
        </div>
      </section>
    
    </article>
    
  )
}
