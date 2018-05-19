<template lang="pug">
  .wrapper
    template(v-for="item in footerItem")
      .item(
      :class="item.isActived ? 'isActived' : ''",
      @click="setFooterItemActive(item.id)"
      )
        router-link(:to="item.path")
          Icon(:name="item.iconName", :key="item.id", :style="{fontSize:'2.5rem'}")
          .content {{item.name}}
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {Icon} from 'vant'

  export default {
    components: {Icon},
    computed: {
      ...mapGetters([
        'footerItem'
      ])
    },
    methods: {
      ...mapActions([
        'setFooterItemActive'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../style/mixin.styl'
  .wrapper
    width 100%
    height $bottomHeight
    // min-height 8%
    display flex
    position fixed
    bottom 0
    border-top 1px solid $borderColor
    justify-content space-around
    align-items center
    background-color $grey
    .item
      transition $transition
      font-size 0
      transform translateY(0.1rem)
      .content
        /*background-color black*/
        font-size 12px
    .isActived
      color $green
      a
        color $green
</style>
