<template lang="pug">
  .money-list-wrapper
    template(v-if="moneyLists.length")
      cell
        template(slot="title")
          Icon.total-icon(name="gold-coin")
          span.total-words 今日合计
        span.total-value ￥{{costTotal}}
      cell-swipe(v-for="(item,index) in moneyLists", :key="index", :right-width="65", :left-width="0", :on-close="(clickPosition, instance) => onClose(clickPosition, instance, index)")
        cell-group
          cell
            template(slot="title")
              i.iconfont.icon(:class="`icon-${item.iconName}`", :style="{color:item.color}")
              span.name {{item.name}}
            span.value ￥{{item.money}}
        span(slot="right") 删除
    template(v-else)
      span 今天还没有消费噢
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {CellSwipe, CellGroup, Cell, Dialog, Icon} from 'vant'
  export default {
    components: {CellSwipe, CellGroup, Cell, Icon},
    computed: {
      ...mapGetters([
        'moneyLists'
      ]),
      costTotal () {
        return this.moneyLists.reduce((accumulator, current) => accumulator + current.money, 0)
      }
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
                this.$toast.success({
                  message: `删除成功`,
                  duration: 1000
                })
                this.removeMoneyItem(index)
                this.$storage.removeItem(index)
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
    .total-icon
      font-size 3.5rem
      color $green
    .total-words
      font-size 2.5rem
      color $font
      margin-left 2rem
    .total-value
      font-size 3rem
      color $font
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
    .van-cell
      align-items center
    .van-cell__title
      display flex
      text-align left
      align-items center
    .van-cell__value
      display flex
      flex-flow column-reverse
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
