import type from './mutation_type'
export default {
  [type.CHANGE_HEADER] (state, obj) {
    state.headerItem = Object.create(null)
    obj.title && (state.headerItem.title = obj.title)
    obj.left && (state.headerItem.left = obj.left)
    obj.right && (state.headerItem.right = obj.right)
  },
  [type.CHANGE_CLASSES] (state, id) {
    if (state.moneyClasses[id].isActive === true) return
    state.moneyClasses.forEach(item => {
      item.id === id ? (item.isActive = true) : (item.isActive = false)
    })
  },
  [type.TOGGLE_ADD_MODEAL_SHOW] (state, isShow) {
    state.isAddModelShow = isShow
  },
  [type.UNSHIFT_MONEY_LIST] (state, list) {
    state.moneyList.unshift(list)
  },
  [type.RMEOVE_MONEY_ITEM] (state, item) {
    state.moneyList.forEach((val, index, arr) => {
      if (val.id === item.id) {
        arr.splice(index, 1)
      }
    })
  },
  [type.CHANGE_TODAY] (state, isToday) {
    state.isToday = isToday
  },
  [type.CHANGE_RANGE] (state, range) {
    state.range = range
  },
  [type.CHANGE_TITLE_DATE] (state, dateString) {
    state.titleDate = dateString
  },
  [type.CHANGE_DATEPICKER_SHOW] (state, show) {
    state.datePickerShow = show
  }
}
