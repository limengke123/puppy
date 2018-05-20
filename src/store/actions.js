import type from './mutation_type'
export default {
  changeHeader ({commit}, obj) {
    commit(type.CHANGE_HEADER, obj)
  },
  changeClasses ({commit}, id) {
    commit(type.CHANGE_CLASSES, id)
  },
  toggleAddModal ({commit}, isShow) {
    commit(type.TOGGLE_ADD_MODEAL_SHOW, isShow)
  },
  addMoneyList ({commit}, list = {}) {
    commit(type.UNSHIFT_MONEY_LIST, list)
  },
  removeMoneyItem ({commit}, index) {
    commit(type.RMEOVE_MONEY_ITEM, index)
  }
}
