import Time from '../utils/time'
export default {
  headerItem (state) {
    return state.headerItem
  },
  footerItem (state) {
    return state.footerItem
  },
  moneyClasses (state) {
    return state.moneyClasses
  },
  currentClass (state) {
    return state.moneyClasses.filter(item => item.isActive === true)[0]
  },
  classesDefaults (state, getters) {
    return getters.currentClass.defaults
  },
  isAddModelShow (state) {
    return state.isAddModelShow
  },
  moneyLists (state) {
    return state.moneyList
  },
  rangeMoneyLists (state, getters) {
    return (range) => {
      // const time = new Time(range)
      const [startTime, endTime] = range
      return getters.moneyLists.filter(item => item.date >= startTime && item.date < endTime)
    }
  },
  isToday (state, getters) {
    return getters.titleDate === new Time(new Date()).getDateString()
  },
  renderList (state, getters) {
    const filterList = state.moneyList.filter(list => list.date === getters.titleDate)
    if (filterList[0] && filterList[0].list) {
      return filterList[0].list
    } else {
      return []
    }
    // const result = state.moneyList.filter(item => item.date === state.titleDate)
    // if (result.length > 0) {
    //   return result[0] && result[0].list
    // } else {
    //   return []
    // }
    // const range = state.range || new Time(new Date()).getRange()
    // return getters.rangeMoneyLists(range)
  },
  titleDate (state) {
    // return state.titleDate === new Time(new Date()).getDateString() ? '今日' : state.titleDate
    return state.titleDate
  },
  datePickerShow (state) {
    return state.datePickerShow
  }
}
