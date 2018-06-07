<template lang="pug">
  .header-wrapper
    NavBar(
      :title="headerItem.title",
      :right-text="headerItem.right",
      :left-text="headerItem.left",
      @click-right="onClickRight"
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
    ]),
    onClickRight () {
      this.$router.push('/statics')
      // this.$toast.fail({
      //   message: '建设开发中',
      //   duration: 1000
      // })
    }
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
            obj.right = '统计'
            break
          case 'note':
            obj.title = '笔记'
            break
          case 'about':
            obj.title = '关于'
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
  .header-wrapper
    position fixed
    width 100%
    z-index 99
</style>

<style lang="stylus">
  @import '../style/mixin.styl'
  .van-nav-bar__title
    font-size 2rem
</style>
