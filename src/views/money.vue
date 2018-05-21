<template lang="pug">
  .wrapper
    money-list
    add-button(@handler="showModal", v-show="isToday")
    add-modal
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import addButton from '../components/baseComponent/addButton.vue'
  import addModal from '../components/addModal.vue'
  import moneyList from '../components/moneyList.vue'
  export default {
    name: 'money',
    components: {addButton, addModal, moneyList},
    methods: {
      ...mapActions([
        'toggleAddModal'
      ]),
      showModal () {
        this.toggleAddModal(true)
      }
    },
    computed: {
      ...mapGetters([
        'isToday'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../style/mixin.styl'
  .wrapper
    font-size 2rem
    padding-bottom $bottomHeight
    padding-top 46px
    overflow-y auto
</style>
