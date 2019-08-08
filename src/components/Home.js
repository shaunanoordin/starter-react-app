import React from 'react'
import { Link } from 'react-router-dom'

export default function Home () {
  return (
    <section>
      <h1>Home</h1>
      <p>This Starter App is designed to be as simple as possible so you can dissect the code at the most basic level to see how it works.</p>
      <p>For specific details, we have the following guides:</p>
      <ul>
        <li><Link to="/mst">MobX State Tree Guide</Link> - how to use MST stores in a React App</li>
      </ul>
    </section>
  )
}
