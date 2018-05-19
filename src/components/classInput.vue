<template lang="pug">
  .wrapper
    van-field(:placeholder="`${classesDefaults[0]}(点击编辑)`", :value="fieldValue")
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
    methods: {
      changeType (index, title) {
        this.fieldValue = title
      }
    },
    watch: {
      classesDefaults () {
        this.tabs = 0
        this.fieldValue = ''
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
