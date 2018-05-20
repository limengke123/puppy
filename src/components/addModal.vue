<template lang="pug">
  Popup(:value="isAddModelShow", @input="showHandler", position="bottom", @click-overlay="hideHandler")
    .content
      Field.num(v-model="money", disabled)
      money-class
      class-input(v-model="type")
    NumberKeyboard(
    :show="true",
    @input="changeMoney",
    extra-key=".",
    @delete="deleteNumber",
    theme="custom",
    close-button-text="完成",
    @_complete_="completeHandler",
    ref="numberKeyBoard"
    )
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {Popup, NumberKeyboard, Field} from 'vant'
  import moneyClass from './moneyClass.vue'
  import classInput from './classInput.vue'
  export default {
    components: {Popup, NumberKeyboard, Field, moneyClass, classInput},
    data () {
      return {
        money: '￥0',
        type: '',
      }
    },
    methods: {
      ...mapActions([
        'toggleAddModal',
        'changeClasses',
        'addMoneyList',
      ]),
      changeMoney (key) {
        this.money = this.makeNumber(this.money, key)
      },
      makeNumber (prev, next) {
        next = next + ''
        if (prev === '￥0' && (next === '0' || next === '.')) return prev
        // if (prev[prev.length - 1] === '.' && (next === '.' || next === '0')) return prev
        if (~(prev.indexOf('.')) && next === '.') return prev
        if (prev.length === 2 && prev === '￥0') return '￥' + next
        return prev + next
      },
      deleteNumber () {
        if (this.money.length === 2) {
          this.money = '￥0'
        } else {
          this.money = this.money.substring(0, this.money.length - 1)
        }
      },
      showHandler (isShow) {
        this.toggleAddModal(isShow)
      },
      hideHandler () {
        this.reset()
      },
      completeHandler () {
        // type为空的时候就去拿该分类下的第一项
        let name = this.type
        let money = +this.money.slice(1)
        if (!this.name) {
          name = this.classesDefaults[0]
        }
        this.addMoneyList({
          type: this.currentClass.name,
          iconName: this.currentClass.iconName,
          color: this.currentClass.color,
          money,
          name,
        })
        this.$toast.success({
          message: `添加成功`,
          duration: 1000
        })
        this.toggleAddModal(false)
        this.reset()
      },
      reset () {
        this.money = '￥0'
        this.changeClasses(0)
      }
    },
    mounted () {
      // vant的坑，没有完成的事件
      const numberKeyBoard = this.$refs.numberKeyBoard
      const completeBtn = numberKeyBoard.$children[12]
      // 点击事件还被阻止了，mmp，用touchstart
      completeBtn.$el.addEventListener('touchstart', function () {
        numberKeyBoard.$emit('_complete_')
      })
    },
    computed: {
      ...mapGetters([
        'isAddModelShow',
        'classesDefaults',
        'currentClass',
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../style/mixin.styl'
  .content
    padding-bottom 21.6rem // keyboard竟然他妈是fixed布局 真坑
    .num
      font-size 4rem
</style>

<style lang="stylus">
  @import '../style/mixin.styl'
  .num
    .van-field__control
      color $font
</style>
