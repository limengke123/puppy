import type from './mutation_type'
export default {
  changeClasses ({commit}, id) {
    commit(type.CHANGE_CLASSES, id)
  }
}
