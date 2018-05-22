<template lang="pug">
  .building-wrapper
    i.iconfont.icon-building2.building
    .content 开发建设中
</template>

<script>
export default {
  name: 'building'
}
</script>

<style lang="stylus" scoped>
  @import '../../style/mixin.styl'
  .building-wrapper
    padding-top 4rem
    color $font
    .building
      font-size 25rem
    .content
      font-size 3rem
</style>
