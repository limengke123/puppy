<template lang="pug">
  .money-list-wrapper
    cell.total
      template(slot="title")
        Icon.total-icon(name="gold-coin")
        span.total-words(@touchstart="changeDate") {{time}}合计
      span.total-value ￥{{costTotal}}
    template(v-if="renderList.length")
      cell-swipe(v-for="(item,index) in renderList", :key="index", :right-width="65", :left-width="0", :on-close="(clickPosition, instance) => onClose(clickPosition, instance, item)")
        cell-group
          cell
            template(slot="title")
              i.iconfont.icon(:class="`icon-${item.iconName}`", :style="{color:item.color}")
              span.name {{item.name}}
            span.value ￥{{item.money}}
        span(slot="right") 删除
    template(v-else)
      .no-found
        i.iconfont.icon-not-found.icon
        .content 没有消费记录
    transition(name="van-slide-bottom")
      DatetimePicker.date-picker(
      type="date",
      @cancel="onCancel",
      @confirm="onConfirm",
      :max-date="maxDate",
      :min-date="minDate",
      v-show="datePickerShow",
      v-model="currentDate",
      )

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
      }
    },
    computed: {
      ...mapGetters([
        'moneyLists',
        'rangeMoneyLists',
        'isToday',
        'renderList',
      ]),
      costTotal () {
        return this.renderList.reduce((accumulator, current) => accumulator + current.money, 0)
      },
      minDate () {
        const date = Date.now()
        const before = date - 3 * 365 * 24 * 60 * 60 * 1000
        // 这句话有坑
        // const beforeYear = `${year - 2}-1-1`
        return new Date(before)
      },
      maxDate () {
        return new Date()
      },
    },
    methods: {
      ...mapActions([
        'removeMoneyItem',
        'changeToday',
        'changeRange',
      ]),
      onClose (clickPosition, instance, item) {
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
                this.removeMoneyItem(item)
                this.$storage.removeItem(item)
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
        this.changeRange(range)
        // this.renderList = this.rangeMoneyLists(range)
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
      z-index 999
    .no-found
      margin-top 2rem
      .content
        font-size 2rem
        color $font
      .icon-not-found
        font-size 15rem
        color $font
</style>

<style lang="stylus">
  // 填组件的坑
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
