<template lang="pug">
  .wrapper
    NavBar(
      title="title",
      left-text="返回",
      right-text="按钮",
      left-arrow,
    )
</template>

<script>
import {mapGetters} from 'vuex'
import {NavBar} from 'vant'
export default {
  components: {NavBar},
  computed: {
    ...mapGetters([
      'headerTitle'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  @import '../style/mixin.styl'
  .wrapper
    position fixed
    height $bottomHeight
    width 100%
    z-index 99
</style>
