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
</style>

<style lang="stylus">
  @import './style/reset.styl'
</style>

<style>
  @import './style/iconfont/iconfont.css';
</style>
