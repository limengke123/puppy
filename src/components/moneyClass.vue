<template lang="pug">
  .wrapper
    .item(
    v-for="item in moneyClasses",
    :class="item.isActive ? 'actived' : ''",
    :style="{color: item.color}",
    :key="item.id",
    @click="changeClasses(item.id)")
      i.iconfont.icon(:class="`icon-${item.iconName}`")
      .content {{item.name}}
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'moneyClasses'
      ])
    },
    methods: {
      ...mapActions([
        'changeClasses'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../style/mixin.styl'
  .wrapper
    // height 5rem
    background-color $bgColor
    display flex
    flex-wrap wrap
    align-items center
    padding 1rem .5rem 1rem .5rem
    .item
      width 20%
      box-sizing border-box
      display flex
      flex-direction column
      align-items center
      justify-content center
      border-radius .3rem
      padding .5rem
      .icon
        font-size 3rem
      .content
        font-size 1.4rem
    .actived
      background $grey
</style>
