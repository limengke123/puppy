import type from './mutation_type'

console.log(type)
export default {
  [type.SET_FOOTER_ACTIVED] (state, id) {
    state.footerItem.forEach(item => {
      item.id === id ? (item.isActived = true) : (item.isActived = false)
    })
  }
}
