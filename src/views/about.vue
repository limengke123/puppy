<template lang="pug">
  .about-wrapper
    building
</template>

<script>
  import building from '../components/baseComponent/building'
  export default {
    name: 'about',
    components: {building}
  }
</script>

<style lang="stylus" scoped>
  @import '../style/mixin.styl'
  .about-wrapper
    padding-top 4.6rem
    padding-bottom $bottomHeight
</style>
