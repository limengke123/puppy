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
  todayMoneyLists (state, getters) {
    return getters.rangeMoneyLists(new Date())
  },
  rangeMoneyLists (state, getters) {
    return (range) => {
      const time = new Time(range)
      const [startTime, endTime] = time.getRange()
      return getters.moneyLists.filter(item => item.date >= startTime && item.date < endTime)
    }
  }
}
