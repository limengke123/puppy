<template lang="pug">
  .wrapper
    NavBar(
      :title="headerItem.title",
      :right-text="headerItem.right",
      :left-text="headerItem.left",
    )
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {NavBar} from 'vant'
export default {
  components: {NavBar},
  data () {
    return {
      infoObj: null
    }
  },
  methods: {
    ...mapActions([
      'changeHeader'
    ])
  },
  computed: {
    ...mapGetters([
      'headerItem'
    ])
  },
  watch: {
    $route: {
      immediate: true,
      handler (val) {
        const obj = Object.create(null)
        switch (val.name) {
          case 'money':
            obj.title = '记账簿'
            obj.right = '流水记录'
            break
          case 'note':
            obj.title = '笔记'
            break
          case 'about':
            obj.title = '其他'
            break
        }
        this.changeHeader(obj)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../style/mixin.styl'
  .wrapper
    position fixed
    width 100%
    z-index 99
</style>
