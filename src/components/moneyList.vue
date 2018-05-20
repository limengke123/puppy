<template lang="pug">
  .money-list-wrapper
    cell-swipe(v-for="(item,index) in moneyLists", :key="index", :right-width="65", :left-width="0", :on-close="(clickPosition, instance) => onClose(clickPosition, instance, index)")
      cell-group
        cell
          template(slot="title")
            i.iconfont.icon(:class="`icon-${item.iconName}`", :style="{color:item.color}")
            span.name {{item.name}}
          span.value ￥{{item.money}}
      span(slot="right") 删除
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {CellSwipe, CellGroup, Cell, Dialog} from 'vant'
  export default {
    components: {CellSwipe, CellGroup, Cell},
    computed: {
      ...mapGetters([
        'moneyLists'
      ])
    },
    methods: {
      ...mapActions([
        'removeMoneyItem'
      ]),
      onClose (clickPosition, instance, index) {
        console.log(index)
        switch (clickPosition) {
          case 'left':
          case 'cell':
          case 'outside':
            instance.close()
            break
          case 'right':
            Dialog.confirm({
              message: '确定删除吗？'
            }).then(resp => {
              if (resp === 'confirm') {
                this.removeMoneyItem(index)
              } else {
                instance.close()
              }
            }).catch(console.log)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../style/mixin.styl'
  .money-list-wrapper
    .icon
      font-size 3rem
    .name
      margin-left 2rem
      font-size 2rem
      color $font
    .value
      font-size 2.4rem
      color $font
</style>

<style lang="stylus">
  // 填vant的坑
  .money-list-wrapper
    .van-cell__title
      display flex
      text-align left
    .van-cell-swipe__right
      color #FFFFFF
      font-size 15px
      width 65px
      height 44px
      display inline-block
      text-align center
      line-height 44px
      background-color #F44
    .van-cell-swipe__left
      color #FFFFFF
      font-size 15px
      width 65px
      height 44px
      display inline-block
      text-align center
      line-height 44px
      background-color #F44
</style>
