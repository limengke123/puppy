export default {
  footerItem (state) {
    return state.footerItem
  },
  headerTitle (state) {
    return state.footerItem.filter(item => item.isActived === true)[0].name
  }
}
