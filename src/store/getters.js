export default {
  footerItem (state) {
    return state.footerItem
  },
  moneyClasses (state) {
    return state.moneyClasses
  },
  classesDefaults (state) {
    return state.moneyClasses.filter(item => item.isActive === true)[0].defaults
  },
  isAddModelShow (state) {
    return state.isAddModelShow
  },
  moneyLists (state) {
    return state.moneyList
  }
}
