<template lang="pug">
  #app
    template(v-if="$route.meta.main")
      Header
      router-view
      Footer
    template(v-else)
      router-view
</template>

<script>
import Header from './components/header'
import Footer from './components/newFooter.vue'
export default {
  name: 'app',
  components: {Header, Footer}
}
</script>

<style lang="stylus" scoped>
  @import './style/mixin.styl'
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    color $font
    text-align center
    /*flex-direction column*/
    /*justify-content space-between*/
    /*max-width 100vw*/
    /*height 100vh*/
    /*display flex*/
</style>

<style lang="stylus">
  @import './style/reset.styl'
</style>
