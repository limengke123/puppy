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
      this.currentDate = new Date()
      this.datePickerShow = true
    },
    onCancel () {
      this.datePickerShow = false
    },
    onConfirm () {
      // this.lineSource = this.lineFormatSource
      this.reRenderLineChart()
      this.reRenderPieChart()
      this.datePickerShow = false
    },
    reRenderLineChart () {
      this.lineChart.clear()
      this.lineChart.source(this.lineFormatSource)
      this.lineChart.line().position('day*value')
      this.lineChart.render()
    },
    reRenderPieChart () {
      let Util = F2.Util
      let G = F2.G
      let Group = G.Group
      let data = [{
        type: '饮食',
        cost: Math.random() * 600,
        a: '1'
      }, {
        type: '服饰美容',
        cost: 338,
        a: '1'
      }, {
        type: '健康',
        cost: 118.5,
        a: '1'
      }, {
        type: '生活用品',
        cost: 78.64,
        a: '1'
      }, {
        type: '其他',
        cost: 14.9,
        a: '1'
      }, {
        type: '交通出行',
        cost: 8.7,
        a: '1'
      }]
      function drawLabel (shape, coord, canvas) {
        let center = coord.center
        let origin = shape.get('origin')
        let points = origin.points
        let x1 = (points[2].x - points[1].x) * 0.75 + points[1].x
        let x2 = (points[2].x - points[1].x) * 1.8 + points[1].x
        let y = (points[0].y + points[1].y) / 2
        let point1 = coord.convertPoint({
          x: x1,
          y: y
        })
        let point2 = coord.convertPoint({
          x: x2,
          y: y
        })

        let group = new Group()
        group.addShape('Line', {
          attrs: {
            x1: point1.x,
            y1: point1.y,
            x2: point2.x,
            y2: point2.y,
            lineDash: [0, 2, 2],
            stroke: '#808080'
          }
        })
        let text = group.addShape('Text', {
          attrs: {
            x: point2.x,
            y: point2.y,
            text: origin._origin.type + '  ' + origin._origin.cost + ' 元',
            fill: '#808080',
            textAlign: 'start',
            textBaseline: 'bottom'
          }
        })
        let textWidth = text.getBBox().width
        let baseLine = group.addShape('Line', {
          attrs: {
            x1: point2.x,
            y1: point2.y,
            x2: point2.x,
            y2: point2.y,
            stroke: '#808080'
          }
        })
        if (point2.x > center.x) {
          baseLine.attr('x2', point2.x + textWidth)
        } else if (point2.x < center.x) {
          text.attr('textAlign', 'end')
          baseLine.attr('x2', point2.x - textWidth)
        } else {
          text.attr('textAlign', 'center')
          text.attr('textBaseline', 'top')
        }
        canvas.add(group)
        shape.label = group
      }
      let sum = data.reduce((accumulation, current) => accumulation + current.cost, 0)
      this.pieChart.clear()
      this.pieChart.source(data)
      let lastClickedShape
      this.pieChart.legend({
        position: 'bottom',
        offsetY: -5,
        marker: 'square',
        align: 'center',
        onClick: function onClick (ev) {
          console.log(this)
          let clickedItem = ev.clickedItem
          let dataValue = clickedItem.get('dataValue')
          let canvas = this.pieChart.get('canvas')
          let coord = this.pieChart.get('coord')
          let geom = this.pieChart.get('geoms')[0]
          let container = geom.get('container')
          let shapes = geom.get('shapes') // 只有带精细动画的 geom 才有 shapes 这个属性

          let clickedShape
          // 找到被点击的 shape
          Util.each(shapes, function (shape) {
            let origin = shape.get('origin')
            if (origin && origin._origin.type === dataValue) {
              clickedShape = shape
              return false
            }
          })

          if (lastClickedShape) {
            lastClickedShape.animate().to({
              attrs: {
                lineWidth: 0
              },
              duration: 200
            }).onStart(function () {
              if (lastClickedShape.label) {
                lastClickedShape.label.hide()
              }
            }).onEnd(function () {
              lastClickedShape.set('selected', false)
            })
          }

          if (clickedShape.get('selected')) {
            clickedShape.animate().to({
              attrs: {
                lineWidth: 0
              },
              duration: 200
            }).onStart(function () {
              if (clickedShape.label) {
                clickedShape.label.hide()
              }
            }).onEnd(function () {
              clickedShape.set('selected', false)
            })
          } else {
            let color = clickedShape.attr('fill')
            clickedShape.animate().to({
              attrs: {
                lineWidth: 5
              },
              duration: 350,
              easing: 'bounceOut'
            }).onStart(function () {
              clickedShape.attr('stroke', color)
              clickedShape.set('zIndex', 1)
              container.sort()
            }).onEnd(function () {
              clickedShape.set('selected', true)
              clickedShape.set('zIndex', 0)
              container.sort()
              lastClickedShape = clickedShape
              if (clickedShape.label) {
                clickedShape.label.show()
              } else {
                drawLabel(clickedShape, coord, canvas)
              }
              canvas.draw()
            })
          }
        }
      })
      this.pieChart.interval().position('a*cost').color('type', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3419E0']).adjust('stack')
      this.pieChart.guide().text({
        position: ['50%', '50%'],
        content: sum.toFixed(2),
        style: {
          fontSize: 24
        }
      })
      this.pieChart.render()
    },
    createLineChart () {
      const chart = new F2.Chart({
        id: 'lineChart',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? window.innerHeight - 54 : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio, // 指定分辨率
      })
      chart.source(this.lineFormatSource, {
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
      // 横纵坐标点对应值
      chart.point().position('day*value').style({
        stroke: '#fff',
        lineWidth: 1
      })
      chart.render()
      // 挂到实例上面
      this.lineChart = chart
    },
    createPieChart () {
      let Util = F2.Util
      let G = F2.G
      let Group = G.Group

      function drawLabel (shape, coord, canvas) {
        let center = coord.center
        let origin = shape.get('origin')
        let points = origin.points
        let x1 = (points[2].x - points[1].x) * 0.75 + points[1].x
        let x2 = (points[2].x - points[1].x) * 1.8 + points[1].x
        let y = (points[0].y + points[1].y) / 2
        let point1 = coord.convertPoint({
          x: x1,
          y: y
        })
        let point2 = coord.convertPoint({
          x: x2,
          y: y
        })

        let group = new Group()
        group.addShape('Line', {
          attrs: {
            x1: point1.x,
            y1: point1.y,
            x2: point2.x,
            y2: point2.y,
            lineDash: [0, 2, 2],
            stroke: '#808080'
          }
        })
        let text = group.addShape('Text', {
          attrs: {
            x: point2.x,
            y: point2.y,
            text: origin._origin.type + '  ' + origin._origin.cost + ' 元',
            fill: '#808080',
            textAlign: 'start',
            textBaseline: 'bottom'
          }
        })
        let textWidth = text.getBBox().width
        let baseLine = group.addShape('Line', {
          attrs: {
            x1: point2.x,
            y1: point2.y,
            x2: point2.x,
            y2: point2.y,
            stroke: '#808080'
          }
        })
        if (point2.x > center.x) {
          baseLine.attr('x2', point2.x + textWidth)
        } else if (point2.x < center.x) {
          text.attr('textAlign', 'end')
          baseLine.attr('x2', point2.x - textWidth)
        } else {
          text.attr('textAlign', 'center')
          text.attr('textBaseline', 'top')
        }
        canvas.add(group)
        shape.label = group
      }

      let data = [{
        type: '饮食',
        cost: 669.47,
        a: '1'
      }, {
        type: '服饰美容',
        cost: 338,
        a: '1'
      }, {
        type: '健康',
        cost: 118.5,
        a: '1'
      }, {
        type: '生活用品',
        cost: 78.64,
        a: '1'
      }, {
        type: '其他',
        cost: 14.9,
        a: '1'
      }, {
        type: '交通出行',
        cost: 8.7,
        a: '1'
      }]

      let sum = 0
      data.map(function (obj) {
        sum += obj.cost
      })
      let chart = new F2.Chart({
        id: 'pieChart',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? window.innerHeight - 54 : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio
      })
      chart.source(data)
      let lastClickedShape
      chart.legend({
        position: 'bottom',
        offsetY: -5,
        marker: 'square',
        align: 'center',
        onClick: function onClick (ev) {
          let clickedItem = ev.clickedItem
          let dataValue = clickedItem.get('dataValue')
          let canvas = chart.get('canvas')
          let coord = chart.get('coord')
          let geom = chart.get('geoms')[0]
          let container = geom.get('container')
          let shapes = geom.get('shapes') // 只有带精细动画的 geom 才有 shapes 这个属性

          let clickedShape
          // 找到被点击的 shape
          Util.each(shapes, function (shape) {
            let origin = shape.get('origin')
            if (origin && origin._origin.type === dataValue) {
              clickedShape = shape
              return false
            }
          })

          if (lastClickedShape) {
            lastClickedShape.animate().to({
              attrs: {
                lineWidth: 0
              },
              duration: 200
            }).onStart(function () {
              if (lastClickedShape.label) {
                lastClickedShape.label.hide()
              }
            }).onEnd(function () {
              lastClickedShape.set('selected', false)
            })
          }

          if (clickedShape.get('selected')) {
            clickedShape.animate().to({
              attrs: {
                lineWidth: 0
              },
              duration: 200
            }).onStart(function () {
              if (clickedShape.label) {
                clickedShape.label.hide()
              }
            }).onEnd(function () {
              clickedShape.set('selected', false)
            })
          } else {
            let color = clickedShape.attr('fill')
            clickedShape.animate().to({
              attrs: {
                lineWidth: 5
              },
              duration: 350,
              easing: 'bounceOut'
            }).onStart(function () {
              clickedShape.attr('stroke', color)
              clickedShape.set('zIndex', 1)
              container.sort()
            }).onEnd(function () {
              clickedShape.set('selected', true)
              clickedShape.set('zIndex', 0)
              container.sort()
              lastClickedShape = clickedShape
              if (clickedShape.label) {
                clickedShape.label.show()
              } else {
                drawLabel(clickedShape, coord, canvas)
              }
              canvas.draw()
            })
          }
        }
      })
      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.7,
        radius: 0.85
      })
      chart.axis(false)
      chart.tooltip(false)
      chart.interval().position('a*cost').color('type', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3419E0']).adjust('stack')

      chart.guide().text({
        position: ['50%', '50%'],
        content: sum.toFixed(2),
        style: {
          fontSize: 24
        }
      })
      chart.render()
      /**
       * 暴露到实例上
       * */
      this.pieChart = chart
    },
    createPieChart2 () {
      let map = {
        '芳华': '40%',
        '妖猫传': '20%',
        '机器之血': '18%',
        '心理罪': '15%',
        '寻梦环游记': '5%',
        '其他': '2%'
      }
      let data = [{
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
        name: '其他',
        percent: 0.02,
        a: '1'
      }]
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
    // this.createPieChart()
    this.createPieChart2()
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
