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
    // 判断传进来的是否和之前存好的数据匹配,不匹配就新建一条
    // 解决给以前日期补加记录
    const hasThisDate = state.moneyList.some(item => item.date === list.date)
    if (hasThisDate) {
      state.moneyList.forEach((beforeList, index, arr) => {
        if (beforeList.date === list.date) {
          if (beforeList.list && beforeList.list.length && beforeList.list.length > 0) {
            const id = beforeList.list[0].id + 1
            beforeList.list.unshift({id, ...list})
          } else {
            beforeList.list = [{id: 0, ...list}]
          }
        } else {
          arr.splice(index, 0, {
            date: list.date,
            list: [{id: 0, ...list}]
          })
        }
      })
    } else {
      state.moneyList.unshift({
        date: list.date,
        list: [{id: 0, ...list}]
      })
    }
  },
  [type.RMEOVE_MONEY_ITEM] (state, item) {
    const hasThisDate = state.moneyList.some(list => list.date === item.date)
    if (hasThisDate) {
      state.moneyList.forEach((val) => {
        if (val.date === item.date) {
          val.list.forEach((innerVal, index, arr) => {
            if (innerVal.id === item.id) {
              arr.splice(index, 1)
            }
          })
        }
      })
    }
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
