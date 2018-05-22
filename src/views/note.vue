<template lang="pug">
  .note-wrapper
    building
</template>

<script>
  import building from '../components/baseComponent/building'
  export default {
    name: 'note',
    components: {building}
  }
</script>

<style lang="stylus" scoped>
  @import '../style/mixin.styl'
  .note-wrapper
    padding-bottom $bottomHeight
    padding-top 4.6rem
</style>
