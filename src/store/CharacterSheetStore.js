import { types } from 'mobx-state-tree'
// If you need to access the root store (AppStore), import { getRoot } from 'mobx-state-tree'

const CharacterSheetStore = types.model('CharacterSheetStore', {
  
  job: types.optional(types.string, 'Fighter'),  // types.optional lets us set a default value
  skills: types.frozen({}),  // types.frozen({}) is useful for arbitrary (but non-changing) data stored as objects. For example, results from an API.
  
}).actions(self => {
  return {
    
    setJob (val) {
      self.job = val
    },
    
    setSkills (val) {
      self.skills = val
    },
    
  }
})

export { CharacterSheetStore }
