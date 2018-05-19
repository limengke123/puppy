<template lang="pug">
  Popup(v-model="show", position="bottom")
    .content
      Field(v-model="money")
      money-class
      class-input
    NumberKeyboard(:show="true", @input="changeMoney", extra-key=".", @delete="deleteNumber")

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
      }
    },
    data () {
      return {
        money: '0',
      }
    },
    methods: {
      changeMoney (key) {
        this.money = this.makeNumber(this.money, key)
      },
      makeNumber (prev, next) {
        next = next + ''
        if (prev === '0' && (next === '0' || next === '.')) return prev
        // if (prev[prev.length - 1] === '.' && (next === '.' || next === '0')) return prev
        if (~(prev.indexOf('.')) && next === '.') return prev
        if (prev.length === 1 && prev === '0') return next
        return prev + next
      },
      deleteNumber () {
        if (this.money.length === 1) {
          this.money = '0'
        } else {
          this.money = this.money.substring(0, this.money.length - 1)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .content
    padding-bottom 21.6rem // keyboard竟然他妈是fixed布局 真坑
</style>
