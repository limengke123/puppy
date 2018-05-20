<template lang="pug">
  .input-wrapper
    van-field.field(:placeholder="`${classesDefaults[0]}(点击编辑)`", :value="value")
    van-tabs(v-model="tabs", @click="changeType")
      van-tab(v-for="(item, index) in classesDefaults", :title="item", :key="index")
</template>

<script>
  import {Field, Tab, Tabs} from 'vant'
  import {mapGetters} from 'vuex'
  export default {
    components: {vanField: Field, vanTab: Tab, vanTabs: Tabs},
    computed: {
      ...mapGetters([
        'classesDefaults'
      ])
    },
    data () {
      return {
        fieldValue: '',
        tabs: 0
      }
    },
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    methods: {
      changeType (index, title) {
        this.$emit('input', title)
      }
    },
    watch: {
      // 切换分类的时候，底部输入框重置
      classesDefaults () {
        this.tabs = 0
        this.$emit('input', '')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .wrapper
    .field
      font-size 1.8rem
</style>


<style lang="stylus">
  @import '../style/mixin.styl'
  .input-wrapper
    .field
      .van-field__control
        color $font
</style>
