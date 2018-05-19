<template lang="pug">
  .wrapper
    div hey1111
    div hey
    div hey
    div hey
    div hey
    div hey
    div hey
    div hey
    add-button(@handler="addMoney")
</template>

<script>
  import addButton from '../components/baseComponent/addButton.vue'
  export default {
    name: 'money',
    components: {addButton},
    methods: {
      addMoney (e) {
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../style/mixin.styl'
  .wrapper
    font-size 20px
    padding-bottom $bottomHeight
    padding-top $bottomHeight
    overflow-y auto
</style>
