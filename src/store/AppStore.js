import { types } from 'mobx-state-tree'
import { CharacterSheetStore } from './CharacterSheetStore'

const AppStore = types.model('AppStore', {
  
  player: types.optional(types.string, 'Player 1'),
  
  characterSheet: types.optional(CharacterSheetStore, {}),  // We can use {} to set the initial values of a store
  
}).actions(self => {
  return {
    
    setPlayer (val) {
      self.player = val
    },

  }
})

export { AppStore }
