import { types, getRoot } from 'mobx-state-tree'

const CharacterSheetStore = types.model('CharacterSheetStore', {
  
  job: types.optional(types.string, 'Fighter'),  // types.optional lets us set a default value
  stats: types.frozen({}),  // types.frozen({}) is useful for arbitrary (but non-changing) data stored as objects. For example, results from an API.
  description: types.optional(types.string, 'No description set'),
  
}).actions(self => {
  return {
    
    setJob (val) {
      self.job = val
    },
    
    setStats (val) {
      self.stats = val
    },

    generateDescription () {
      const root = getRoot(self) // If you need to access the root store (AppStore), use getRoot.
      
      const adjectives = ['powerful', 'dangerous', 'cunning', 'terrifying', 'cuddly']
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
      
      self.description = `${root.player} is a ${adjective} ${self.job}!`
      
    }
  }
})

export { CharacterSheetStore }
