import type from './mutation_type'
export default {
  changeClasses ({commit}, id) {
    commit(type.CHANGE_CLASSES, id)
  },
  toggleAddModal ({commit}, isShow) {
    commit(type.TOGGLE_ADD_MODEAL_SHOW, isShow)
  },
  addMoneyList ({commit}, list = {}) {
    commit(type.UNSHIFT_MONEY_LIST, list)
  }
}
