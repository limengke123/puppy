import type from './mutation_type'
export default {
  [type.CHANGE_CLASSES] (state, id) {
    if (state.moneyClasses[id].isActive === true) return
    state.moneyClasses.forEach(item => {
      item.id === id ? (item.isActive = true) : (item.isActive = false)
    })
  }
}
