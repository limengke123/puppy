<template lang="pug">
  .wrapper(@touchstart.stop.prevent="handler", :style="styles") {{text}}

</template>

<script>
  import {Button} from 'vant'
  export default {
    components: {vanButton: Button},
    props: {
      text: {
        type: String
      },
      styles: {
        type: Object
      }
    },
    methods: {
      handler (e) {
        this.$emit('handler', e)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../style/mixin.styl'
  .wrapper
    position fixed
    bottom ($bottomHeight + 5rem)
    right 6rem
    width 2rem
    height 2rem
    line-height @height
    padding 1rem
    font-size 3rem
    background-color $green
    border-radius .5rem
    box-shadow .3rem .3rem .8rem rgba(0,0,0,.3)
    color #fff
</style>
