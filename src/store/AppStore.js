import { types } from 'mobx-state-tree'
import { CharacterSheetStore } from './CharacterSheetStore'

const DEMO_MODE_STORAGE_KEY = 'demoMode'

const AppStore = types.model('AppStore', {
  
  player: types.optional(types.string, 'Player 1'),
  
  characterSheet: types.optional(CharacterSheetStore, {}),  // We can use {} to set the initial values of a store
  
}).actions(self => {
  return {
    
    setUser (val) {
      self.user = val
    },

  }
})

export { AppStore }
