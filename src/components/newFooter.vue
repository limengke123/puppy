<template lang="pug">
  .wrapper
    Tabbar(v-model="active")
      TabbarItem(v-for="item in footerItem", :key="item.key", :icon="item.iconName", :to="item.path") {{item.name}}
</template>

<script>
  import {Tabbar, TabbarItem} from 'vant'
  import {mapGetters} from 'vuex'
  export default {
    components: {Tabbar, TabbarItem},
    computed: {
      ...mapGetters([
        'footerItem'
      ])
    },
    data () {
      return {
        active: 0
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../style/mixin.styl'
  .wrapper
    width 100%
    height $bottomHeight
    position fixed
    bottom 0
</style>
