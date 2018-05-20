<template lang="pug">
  .money-list-wrapper
    cell-swipe(:right-width="65", :left-width="65")
      span(slot="left") 选择
      cell-group
        cell(title="单元格" value="内容")
      span(slot="right") 删除
</template>

<script>
  import {mapGetters} from 'vuex'
  import {CellSwipe, CellGroup, Cell} from 'vant'
  export default {
    components: {CellSwipe, CellGroup, Cell},
    computed: {
      ...mapGetters([
        'moneyLists'
      ])
    }
  }
</script>

<style lang="stylus" scoped>

</style>
