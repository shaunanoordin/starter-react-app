import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import MSTGuide from './MSTGuide'

class App extends React.Component {
  constructor () {
    super()
  }
  
  render () {
    return (
      <Router>
        <>
          <Header />
          <main>
            <Route path="/" exact component={Home} />
            <Route path="/mst" component={MSTGuide} />
          </main>
          <footer>Footer</footer>
        </>
      </Router>
    )
  }
}

export default App
