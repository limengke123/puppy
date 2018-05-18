import type from './mutation_type'

export default {
  setFooterItemActive ({commit}, id) {
    commit(type.SET_FOOTER_ACTIVED, id)
  }
}
