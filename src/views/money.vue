<template lang="pug">
  .wrapper
    div hey1111
    div
      i.iconfont.icon-income
      i.iconfont.icon-food
    div hey
    div hey
    div hey
    div hey
    div hey
    div hey
    add-button(@handler="showModal")
    add-modal(v-model="show")
</template>

<script>
  import addButton from '../components/baseComponent/addButton.vue'
  import addModal from '../components/addModal.vue'
  export default {
    name: 'money',
    components: {addButton, addModal},
    data () {
      return {
        show: false
      }
    },
    methods: {
      showModal (e) {
        this.show = true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../style/mixin.styl'
  .wrapper
    font-size 2rem
    padding-bottom $bottomHeight
    padding-top $bottomHeight
    overflow-y auto
</style>
