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
  },
  titleDate (state) {
    return state.titleDate
  },
  datePickerShow (state) {
    return state.datePickerShow
  },
  // 拿到筛选后的数据
  filterData (state) {
    /**
     * 按照年月日查找数组
     * */
    const timeHelper = (timeStr) => ({year: +timeStr.split('/')[0], month: +timeStr.split('/')[1]})
    return ({year, month}) => state.moneyList.filter(list => (timeHelper(list.date).year === year && timeHelper(list.date).month === month))
  }
}
