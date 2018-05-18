<template lang="pug">
  .wrapper
    NavBar(
      :title="headerTitle",
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
</style>
