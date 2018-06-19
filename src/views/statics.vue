<template lang="pug">
  .statics-wrapper
    nav-bar.nav-bar-statics(
      title="数据统计",
      left-text="返回",
      :right-text="currentMonthChi",
      left-arrow,
      @click-left="onClickLeft",
      @click-right="onClickRight")
    .statcis-main-wrapper
      canvas(id="lineChart")
      <!--canvas(id="pieChart")-->
      canvas(id="pieChart2")
    transition(name="van-slide-bottom")
      DatetimePicker.date-picker(
        type="year-month",
        @cancel="onCancel",
        @confirm="onConfirm",
        :min-date="minDate",
        :max-date="maxDate",
        v-show="datePickerShow",
        v-model="currentDate",
      )
</template>

<script>
import F2 from '@antv/f2'
import {mapGetters} from 'vuex'
import {NavBar, DatetimePicker} from 'vant'
export default {
  name: 'statics',
  components: {NavBar, DatetimePicker},
  data () {
    return {
      datePickerShow: false,
      currentDate: new Date()
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/')
    },
    onClickRight () {
      // this.currentDate = new Date()
      this.datePickerShow = true
    },
    onCancel () {
      this.datePickerShow = false
    },
    onConfirm () {
      // this.lineSource = this.lineFormatSource
      this.reRenderLineChart()
      // this.reRenderPieChart()
      this.reRenderPieChart()
      this.datePickerShow = false
    },
    reRenderLineChart () {
      this.createLineChart(this.lineFormatSource)
    },
    reRenderPieChart () {
      let datas = [{
        name: '芳华',
        percent: 0.4,
        a: '1'
      }, {
        name: '妖猫传',
        percent: 0.2,
        a: '1'
      }, {
        name: '机器之血',
        percent: 0.18,
        a: '1'
      }, {
        name: '心理罪',
        percent: 0.15,
        a: '1'
      }, {
        name: '寻梦环游记',
        percent: 0.05,
        a: '1'
      }, {
        name: '测试',
        percent: Math.random(),
        a: '1'
      }, {
        name: '其他',
        percent: 0.02,
        a: '1'
      }]
      this.createPieChart(datas)
    },
    createLineChart (data) {
      data = data || this.lineFormatSource
      const chart = new F2.Chart({
        id: 'lineChart',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? window.innerHeight - 54 : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio, // 指定分辨率
      })
      chart.source(data, {
        value: {
          // 纵轴最大最小,以及坐标稀度
          tickCount: 5,
          // min: 0
        },
        day: {
          // 横坐标稀度
          range: [0, 1],
          tickCount: 5
        }
      })
      chart.tooltip({
        // 显示竖线
        showCrosshairs: true,
        // 显示的时候多个小蓝点
        showItemMarker: false,
        onShow: function onShow (ev) {
          // 显示的样子
          let items = ev.items
          items[0].name = null
          items[0].value = items[0].title + '  $ ' + items[0].value
        }
      })
      chart.axis('day', {
        label: function label (text, index, total) {
          let textCfg = {}
          if (index === 0) {
            textCfg.textAlign = 'left'
          } else if (index === total - 1) {
            textCfg.textAlign = 'right'
          }
          return textCfg
        }
      })
      // 横纵坐标线对应值
      chart.line().position('day*value')
      // 横纵坐标点对应值, 这个点太难看了 先关闭
      // chart.point().position('day*value').style({
      //   stroke: '#fff',
      //   lineWidth: 1
      // })
      chart.render()
      // 挂到实例上面
      this.lineChart = chart
    },
    createPieChart (data) {
      let map = {
        '芳华': '40%',
        '妖猫传': '20%',
        '机器之血': '18%',
        '心理罪': '15%',
        '寻梦环游记': '5%',
        '测试': '5%',
        '其他': '2%'
      }
      let datas = [{
        name: '芳华',
        percent: 0.4,
        a: '1'
      }, {
        name: '妖猫传',
        percent: 0.2,
        a: '1'
      }, {
        name: '机器之血',
        percent: 0.18,
        a: '1'
      }, {
        name: '心理罪',
        percent: 0.15,
        a: '1'
      }, {
        name: '寻梦环游记',
        percent: 0.05,
        a: '1'
      }, {
        name: '测试',
        percent: Math.random(),
        a: '1'
      }, {
        name: '其他',
        percent: 0.02,
        a: '1'
      }]
      data = data || datas
      let chart = new F2.Chart({
        id: 'pieChart2',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? window.innerHeight - 54 : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio
      })
      chart.source(data, {
        percent: {
          formatter: function formatter (val) {
            return val * 100 + '%'
          }
        }
      })
      chart.legend({
        position: 'right',
        itemFormatter: function itemFormatter (val) {
          return val + '  ' + map[val]
        }
      })
      chart.tooltip(false)
      chart.coord('polar', {
        transposed: true,
        radius: 0.85
      })
      chart.axis(false)
      chart.interval().position('a*percent').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']).adjust('stack').style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      }).animate({
        appear: {
          duration: 1200,
          easing: 'bounceOut'
        }
      })
      chart.render()
      this.pieChart = chart
    }
  },
  computed: {
    ...mapGetters([
      'filterData'
    ]),
    currentMonth () {
      return this.currentDate.getMonth() + 1
    },
    currentMonthChi () {
      const month = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ]
      return month[this.currentMonth - 1]
    },
    currentYear () {
      return this.currentDate.getFullYear()
    },
    currentMonthMaxDay () {
      /**
       * 获取当月天数
       * 设置天数为0就能获取到当月天数长度
       * */
      return new Date(this.currentYear, this.currentMonth, 0).getDate()
    },
    // 当前数据源
    currentResult () {
      return this.filterData({year: this.currentYear, month: this.currentMonth})
    },
    lineFormatSource () {
      let result = new Array(this.currentMonthMaxDay).fill(Object.create(null))
      /**
       * 这里打印`${result}`会报错
       * 原因是Object.create(null)
       * 生成的对象是没有toString方法的
       * */
      const formatedData = this.currentResult.map(item => ({day: item.date, value: item.list.reduce((accument, val) => accument + val.money, 0)}))
      /* eslint-disable */
      // return result.map((item, index) => ({day: `${this.currentMonth}/${index}`, value: formatedData.filter(item => item.date === `${this.currentYear}/${index + 1}`)[0] && formatedData.filter(item => item.date === `${this.currentYear}/${index + 1}`)[0].value || 0}) )
      return result.map(( current, index) => {
        let filterData = formatedData.filter(item => item.day === `${this.currentYear}/${this.currentMonth}/${index + 1}`)
        if (filterData.length > 0) {
          return filterData[0]
        } else {
          return {
            day: `${this.currentYear}/${this.currentMonth}/${index + 1}`,
            value: 0
          }
        }
      })
    },
    maxDate () {
      return new Date()
    },
    minDate () {
      const date = Date.now()
      const before = date - 2 * 365 * 24 * 60 * 60 * 1000
      return new Date(before)
    }
  },
  destroyed () {
    console.log(`destroy`)
  },
  mounted () {
    this.createLineChart()
    this.createPieChart()
  }
}
</script>

<style lang="stylus" scoped>
  .statics-wrapper
    font-size 2rem
    .nav-bar-statics
      position fixed
      width 100%
    .statcis-main-wrapper
      padding-top 3.83rem
    .date-picker
      position fixed
      bottom 0
      width 100%
      z-index 999
</style>

<style lang="stylus">
  .statics-wrapper
    .van-picker__columns
      background-color #f7faff
    .van-picker__toolbar
      background-color #f7faff
</style>
