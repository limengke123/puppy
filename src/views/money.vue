<template lang="pug">
  .wrapper
    money-list
    add-button(@handler="backToday", v-show="!isToday", text="<", :styles="{backgroundColor: '#ef6060', bottom: '20rem'}")
    add-button(@handler="showDatePicker", text="...", :styles="{backgroundColor: '#2b92d8', bottom: '15rem'}")
    add-button(@handler="showModal", text="+")
    add-modal
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import addButton from '../components/baseComponent/addButton.vue'
  import addModal from '../components/addModal.vue'
  import moneyList from '../components/moneyList.vue'
  import Time from '../utils/time'
  export default {
    name: 'money',
    components: {addButton, addModal, moneyList},
    methods: {
      ...mapActions([
        'toggleAddModal',
        'changeTitleDate',
        'changeRange',
        'changeDatePickerShow',
      ]),
      showModal () {
        this.toggleAddModal(true)
      },
      backToday () {
        const time = new Time(new Date())
        const range = time.getRange()
        this.changeTitleDate(new Time(new Date()).getDateString())
        this.changeRange(range)
      },
      showDatePicker () {
        this.changeDatePickerShow(true)
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
