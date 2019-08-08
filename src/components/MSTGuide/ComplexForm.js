import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'
import { stopEvent } from '@util'

class ComplexForm extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const characterSheet = this.context.characterSheet
    
    return (
      <form
        className="form"
        onSubmit={(e) => { return stopEvent(e) }}
      >
        <h2>Character Sheet</h2>
        
        <fieldset>
          <legend>Job</legend>
          <input
            type="text"
            defaultValue={characterSheet.job}
            onChange={e => characterSheet.setJob(e.target.value) }
          />
        </fieldset>
        
        <fieldset>
          <legend>Stats</legend>
          <button
            className="action button"
            onClick={this.rollStats.bind(this)}
          >
            Roll for Stats
          </button>
            
          {Object.keys(characterSheet.stats).map(key => (
            <div key={`stat-${key}`}>
              <b>{key}</b> : <i>{characterSheet.stats[key]}</i>
            </div>
          ))}
        </fieldset>
            
      </form>
    )
  }
  
  rollStats () {
    const characterSheet = this.context.characterSheet
    const roll = this.roll1d6;
    
    const stats = {
      strength: roll() + roll() + roll(),
      dexterity: roll() + roll() + roll(),
      constitution: roll() + roll() + roll(),
      wisdom: roll() + roll() + roll(),
      intelligence: roll() + roll() + roll(),
      charisma: roll() + roll() + roll(),
    }
    
    characterSheet.setStats(stats)
  }

  roll1d6 () {
    return Math.floor(Math.random() * 6) + 1
  }
}

ComplexForm.contextType = AppContext

export default observer(ComplexForm)
