<template lang="pug">
  .money-list-wrapper
    cell.total
      template(slot="title")
        Icon.total-icon(name="gold-coin")
        span.total-words(@touchstart.stop.prevent="changeDate") {{time}}合计
      span.total-value ￥{{costTotal}}
    template(v-if="renderList.length")
      cell-swipe(v-for="(item,index) in renderList", :key="index", :right-width="65", :left-width="0", :on-close="(clickPosition, instance) => onClose(clickPosition, instance, index)")
        cell-group
          cell
            template(slot="title")
              i.iconfont.icon(:class="`icon-${item.iconName}`", :style="{color:item.color}")
              span.name {{item.name}}
            span.value ￥{{item.money}}
        span(slot="right") 删除
    template(v-else)
      .no-found
        span 没有消费喔
    transition(name="van-slide-bottom")
      DatetimePicker.date-picker(
      v-model="currentDate",
      type="date",
      :min-date="minDate",
      :max-date="maxDate",
      v-show="datePickerShow",
      @cancel="onCancel",
      @confirm="onConfirm")
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {CellSwipe, CellGroup, Cell, Dialog, Icon, DatetimePicker} from 'vant'
  import Time from '../utils/time'
  export default {
    components: {CellSwipe, CellGroup, Cell, Icon, DatetimePicker},
    data () {
      return {
        datePickerShow: false,
        currentDate: new Date(),
        time: '今日',
        // 这里不能直接用computed里面todayMoneyLists, 因为vue实例化,先初始化state后处理computed
        renderList: this.$store.getters.todayMoneyLists,
      }
    },
    computed: {
      ...mapGetters([
        'moneyLists',
        'todayMoneyLists',
        'rangeMoneyLists',
        'isToday',
      ]),
      costTotal () {
        return this.renderList.reduce((accumulator, current) => accumulator + current.money, 0)
      },
      minDate () {
        const date = new Date()
        const year = date.getFullYear()
        const beforeYear = `${year - 2}-1-1`
        return new Date(beforeYear)
      },
      maxDate () {
        return new Date()
      }
    },
    methods: {
      ...mapActions([
        'removeMoneyItem',
        'changeToday',
      ]),
      onClose (clickPosition, instance, index) {
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
      },
      changeDate () {
        this.datePickerShow = !this.datePickerShow
      },
      onCancel () {
        this.datePickerShow = false
      },
      onConfirm (value) {
        const time = new Time(value)
        const today = new Date()
        if (time.getDateString() === `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`) {
          this.changeToday(true)
          this.time = '今日'
        } else {
          this.time = time.getDateString()
          this.changeToday(false)
        }
        const range = time.getRange()
        this.renderList = this.rangeMoneyLists(range)
        this.datePickerShow = false
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
    .date-picker
      position fixed
      bottom 0
      width 100%
      z-index 99
</style>

<style lang="stylus">
  // 填vant的坑
  .money-list-wrapper
    .total
      .van-cell__title
        flex 2
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
