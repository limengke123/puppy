<template lang="pug">
  .wrapper
    template(v-for="item in footerItem")
      .item(
        :class="item.isActived ? 'isActived' : ''",
        @click="setFooterItemActive(item.id)"
        )
        router-link(:to="item.path")
          Icon(:name="item.iconName", :key="item.id", :style="{fontSize:'1.6rem'}")
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
    height 3.5rem
    min-height 8%
    display flex
    justify-content space-around
    align-items center
    background-color $grey
    .item
     transition $transition
    .isActived
      color $green
      a
        color $green
</style>
