<template lang="pug">
  Popup(:value="value", @input="showHandler", position="bottom")
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
    @blur="blurHandler",
    @hide="hideHandler"
    )
</template>

<script>
  import {Popup, NumberKeyboard, Field} from 'vant'
  import moneyClass from './moneyClass.vue'
  import classInput from './classInput.vue'
  export default {
    components: {Popup, NumberKeyboard, Field, moneyClass, classInput},
    props: {
      show: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        money: '￥0',
        type: '',
        value: true
      }
    },
    methods: {
      changeMoney (key) {
        console.log(key)
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
      blurHandler () {
        // console.log(arguments)
      },
      hideHandler () {
        console.log(`hide`)
        console.log(this.money)
        console.log(this.type)
      },
      showHandler (show) {
        this.value = show
        this.$emit('input', show)
      }
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
